import { Controller, Get, Param } from "@nestjs/common";
import { APIDataService } from "./apidata.service";
import { APIRateLimiter } from "src/common/decorators/apiratelimiter.decorator";

@Controller('api')
export class APIDataController {
    constructor(
        private readonly apidataService: APIDataService
    ) { }

    @Get('/cities')
    @APIRateLimiter()
    FetchCities(

    ) {
        return this.apidataService.GetAllCities()
    }

    @Get('/cities/:id')
    FetchCity(
        @Param('id') id: string
    ) {
        return this.apidataService.GetCityByID(id)
    }

    @Get('/cities/name/:name')
    FetchCityByName(
        @Param('name') name: string
    ) {
        return this.apidataService.GetCityByName(name);
    }

    @Get('/cities/code/:code')
    FetchCityCode (
        @Param('code') code: string        
    ) {
        return this.apidataService.GetCitybyCode(code)
    }

}