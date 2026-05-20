import {
    CanActivate,
    ExecutionContext,
    Injectable,
    UnauthorizedException,
    ForbiddenException
} from "@nestjs/common";

import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import * as bcrypt from "bcrypt";

import {
    ApiKey,
    ApiKeyDocument
} from "../../auth/schema/apikey.schema";

@Injectable()
export class APIRateLimiterGuard implements CanActivate {

    constructor(
        @InjectModel(ApiKey.name)
        private readonly apiKeyModel: Model<ApiKeyDocument>
    ) { }

    async canActivate(
        context: ExecutionContext
    ): Promise<boolean> {

        const request =
            context.switchToHttp().getRequest();

        const apiKey =
            request.headers['x-api-key'];

        if (!apiKey) {
            throw new UnauthorizedException(
                'API Key is required'
            );
        }


        const keys = await this.apiKeyModel.find();

        let matchedKey: ApiKeyDocument | null = null;


        for (const key of keys) {

            const isMatch = await bcrypt.compare(
                apiKey,
                key.apikey
            );

            if (isMatch) {
                matchedKey = key;
                break;
            }
        }

        if (!matchedKey) {
            throw new UnauthorizedException(
                'Invalid API Key'
            );
        }

        if (matchedKey.reqeuests <= 0) {
            throw new ForbiddenException(
                'Monthly API limit reached'
            );
        }

        matchedKey.reqeuests -= 1;

        await matchedKey.save();

        request.apikey = matchedKey;

        return true;
    }
}