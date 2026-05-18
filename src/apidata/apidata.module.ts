import { Module } from "@nestjs/common";
import { AuthModule } from "src/auth/auth.module";
import { RoleModule } from "src/role/role.module";
import { APIDataController } from "./apidata.controller";
import { APIDataService } from "./apidata.service";

@Module({
    imports: [
        RoleModule,
        AuthModule,
    ],
    controllers: [APIDataController],
    providers: [APIDataService]
})

export class APIDataModule { }