import { Body, Controller, Headers, Post, UnauthorizedException, UseGuards } from "@nestjs/common";
import { ApeKeyService } from "./apikey.service";
import { JwtAuthGuard } from "src/common/guard/jwt-auth.guard";
import { PermissionsGuard } from "src/common/guard/permissions.guard";
import { Permissions } from "src/common/decorators/permissions.decorator";
import { CreateAPIKeyDto } from "./dto/create-apikey.dto";

@Controller('api/keys')
export class ApiKeyController {
    constructor(
        private readonly apikeyService: ApeKeyService
    ) { }

    @Post('create-key')
    @UseGuards(JwtAuthGuard, PermissionsGuard)
    @Permissions('apikey:create')

    CreateAPIKey(
        @Body() dto: CreateAPIKeyDto,
        @Headers("authorization") authHeader: string,
    ) {
        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            throw new UnauthorizedException("Invalid or missing token");
        }

        const token = authHeader.split(" ")[1];
        
        return this.apikeyService.CreateAPIKey(
            token,
            dto
        )
    }
}