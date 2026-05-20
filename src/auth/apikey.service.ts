import { ConflictException, Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { EmailService } from "src/common/utils/email.util";
import { User, UserDocument } from "src/user/schema/user.schema";
import { ApiKey, ApiKeyDocument } from "./schema/apikey.schema";
import { AuditLog, AuditLogDocument } from "src/auditlogs/schema/auditlog.schema";
import { CreateAPIKeyDto } from "./dto/create-apikey.dto";

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
        dto: CreateAPIKeyDto
    ) {
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

        
    }

}