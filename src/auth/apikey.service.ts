import { ConflictException, Injectable, NotFoundException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { EmailService } from "src/common/utils/email.util";
import { User, UserDocument } from "src/user/schema/user.schema";
import { ApiKey, ApiKeyDocument } from "./schema/apikey.schema";
import { AuditLog, AuditLogDocument } from "src/auditlogs/schema/auditlog.schema";
import { CreateAPIKeyDto } from "./dto/create-apikey.dto";
import { CreateAPIKey } from "src/common/utils/create-apikey.util";
import { createAuditLog } from "src/common/utils/auditlogs.util";
import bcrypt from 'bcrypt'

@Injectable()
export class ApeKeyService {
    constructor(
        @InjectModel(User.name)
        private readonly userModel: Model<UserDocument>,

        @InjectModel(ApiKey.name)
        private readonly apikeyModel: Model<ApiKeyDocument>,

        @InjectModel(AuditLog.name)
        private readonly auditlogModel: Model<AuditLogDocument>,

        private jwtService: JwtService,
        private emailService: EmailService,
    ) { }

    async CreateAPIKey(
        token: string,
        dto: CreateAPIKeyDto,
        ipAddress?: string,
        userAgent?: string
    ) {
        const payload = await this.jwtService.verify(token)
        const user = await this.userModel.findOne({ email: payload.user })

        if (!user) {
            throw new NotFoundException("The User Not Found")
        }

        const checkuser = await this.apikeyModel.findOne({ email: dto.email })

        if (checkuser) {
            if (checkuser.reqeuests === 0) {
                throw new ConflictException(
                    'Monthly API request limit reached'
                );
            }
            throw new ConflictException(
                'User already requested an API key'
            );
        }

        const apikey = CreateAPIKey()
        const hashapikey = await bcrypt.hash(apikey, 10)

        const apiKeyUser = await this.apikeyModel.create({
            email: dto.email,
            apikey: hashapikey,
            reqeuests: dto.reqeuests
        })

        await createAuditLog(this.auditlogModel, {
            user: user._id,
            action: "REGISTER_MAGIC_LINK_SENT",
            description: `Registration magic link sent to ${user.email}`,
            ipAddress,
            userAgent,
            metadata: {
                ipAddress,
                userAgent,
                location,
            },
        });

        await this.emailService.APIKeyCreatedEmail(
            dto.email,
            apikey,
            dto.reqeuests
        );
    }

}