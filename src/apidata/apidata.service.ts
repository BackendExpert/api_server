import { Injectable } from "@nestjs/common";
import { SqliteService } from "src/common/utils/sqlite.service";

@Injectable()
export class APIDataService {
    constructor (
        private readonly sqliteService: SqliteService
    ) {}

    async GetAllCities () {
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
}