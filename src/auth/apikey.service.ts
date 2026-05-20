import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { EmailService } from "src/common/utils/email.util";
import { User, UserDocument } from "src/user/schema/user.schema";

@Injectable()
export class ApeKeyService{
    constructor(
        @InjectModel(User.name)
        private readonly userModel: Model<UserDocument>,

        private jwtService: JwtService,
        private emailService: EmailService,  
    ) {}

    
}