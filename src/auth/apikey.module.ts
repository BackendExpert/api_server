import { Module } from "@nestjs/common";
import { AuthModule } from "./auth.module";
import { RoleModule } from "src/role/role.module";
import { MongooseModule } from "@nestjs/mongoose";
import { User, UserSchema } from "src/user/schema/user.schema";
import { AuditLog, AuditLogSchema } from "src/auditlogs/schema/auditlog.schema";
import { ApiKey, ApiKeySchema } from "./schema/apikey.schema";
import { ApiKeyController } from "./apikey.controller";
import { ApeKeyService } from "./apikey.service";
import { EmailService } from "src/common/utils/email.util";

@Module({
    imports: [
        AuthModule,
        RoleModule,
        MongooseModule.forFeature([
            { name: User.name, schema: UserSchema },
            { name: AuditLog.name, schema: AuditLogSchema },
            { name: ApiKey.name, schema: ApiKeySchema},
        ])        
    ],
    controllers: [ApiKeyController],
    providers: [
        ApeKeyService,
        EmailService
    ],
    exports: [ApeKeyService]
})

export class ApiKeyModule { }