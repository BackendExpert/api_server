import {
    applyDecorators,
    UseGuards
} from "@nestjs/common";

import { APIRateLimiterGuard }
from "../guard/apiratelimiter.guard";

export function APIRateLimiter() {
    return applyDecorators(
        UseGuards(APIRateLimiterGuard)
    );
}