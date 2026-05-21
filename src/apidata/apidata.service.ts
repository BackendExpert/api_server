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



    // ------------------------------------------------------------------------------
    // -----------------------------Required API Key to access-----------------------
    // ------------------------------------------------------------------------------

    async GetPlaces(query: {
        cityCode?: string;
        type?: string;
        page?: number;
        limit?: number;
    }) {

        const page = Number(query.page) || 1;

        const limit = Math.min(Number(query.limit) || 20, 50);

        const offset = (page - 1) * limit;

        let sql = `
        SELECT places.*
        FROM places
        INNER JOIN cities
        ON places.city_id = cities.id
        WHERE 1 = 1
    `;

        const params: any[] = [];

        // CMB
        if (query.cityCode) {
            sql += ` AND cities.city_code = ?`;
            params.push(query.cityCode);
        }

        if (query.type) {
            sql += ` AND LOWER(places.category) = LOWER(?)`;
            params.push(query.type);
        }

        sql += ` LIMIT ? OFFSET ?`;

        params.push(limit, offset);



        const result = await this.sqliteService.query(sql, params);

        return {
            success: true,
            page,
            limit,
            count: result.length,
            result
        };
    }
}