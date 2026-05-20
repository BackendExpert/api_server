import { Module } from "@nestjs/common";
import { AuthModule } from "src/auth/auth.module";
import { RoleModule } from "src/role/role.module";
import { APIDataController } from "./apidata.controller";
import { APIDataService } from "./apidata.service";
import { APIRateLimiterGuard } from "src/common/guard/apiratelimiter.guard";
import { MongooseModule } from "@nestjs/mongoose";
import { ApiKey, ApiKeySchema } from "src/auth/schema/apikey.schema";

@Module({
    imports: [
        RoleModule,
        AuthModule,
        MongooseModule.forFeature([
            { name: ApiKey.name, schema: ApiKeySchema }
        ])
    ],
    controllers: [APIDataController],
    providers: [APIDataService, APIRateLimiterGuard]
})

export class APIDataModule { }