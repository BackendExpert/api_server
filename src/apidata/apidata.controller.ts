import { Controller, Get } from "@nestjs/common";
import { APIDataService } from "./apidata.service";

@Controller('api')
export class APIDataController{
    constructor (
        private readonly apidataService: APIDataService
    ) {}

    @Get('/cities')
    FetchCities (

    ) {
        return this.apidataService.GetAllCities()
    }
}