import { Injectable, NotFoundException } from "@nestjs/common";
import { SqliteService } from "src/common/utils/sqlite.service";

@Injectable()
export class APIDataService {
    constructor(
        private readonly sqliteService: SqliteService
    ) { }

    async GetAllCities() {
        const getcities = this.sqliteService.query(`
            SELECT *
            FROM cities            
        `)

        return {
            success: true,
            message: "All Cities Fetched Success",
            count: getcities.length,
            result: getcities
        }
    }

    async GetCityByID(id: string) {
        const checkcity = await this.sqliteService.query(`
                SELECT * 
                FROM cities
                WHERE
                id=${id}
            `)

        if (!checkcity || checkcity.length === 0) {
            throw new NotFoundException("City Not Found in the API");
        }

        return {
            success: true,
            message: "City Fetched Success",
            result: checkcity
        }
    }

    async GetCityByName(name: string) {
        const checkcity = await this.sqliteService.query(
            `
                SELECT * 
                FROM cities
                WHERE city_name = ?
                `,
            [name]
        );

        if (!checkcity || checkcity.length === 0) {
            throw new NotFoundException("City Not Found in the API");
        }

        return {
            success: true,
            message: "City Fetched Success",
            result: checkcity
        }
    }

    async GetCitybyCode(code: string) {
        const checkcity = await this.sqliteService.query(
            `
                SELECT * 
                FROM cities
                WHERE city_code = ?
                `,
            [code]
        );

        if (!checkcity || checkcity.length === 0) {
            throw new NotFoundException("City Not Found in the API");
        }

        return {
            success: true,
            message: "City Fetched Success",
            result: checkcity
        }
    }
}