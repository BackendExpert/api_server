import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import Database from 'better-sqlite3';
import * as path from 'path';

@Injectable()
export class SqliteService implements OnModuleInit, OnModuleDestroy {
    private db!: Database.Database;

    onModuleInit() {
        const dbPath = path.join(process.cwd(), 'api_data.db');
        this.db = new Database(dbPath, {
            readonly: true,
            fileMustExist: true,
        });

        console.log(`SQLite connected: ${dbPath}`);
    }

    onModuleDestroy() {
        if (this.db) {
            this.db.close();
            console.log('SQLite connection closed');
        }
    }

    getDb(): Database.Database {
        return this.db;
    }

    query(sql: string, params: any[] = []) {
        return this.db.prepare(sql).all(...params);
    }

    queryOne(sql: string, params: any[] = []) {
        return this.db.prepare(sql).get(...params);
    }
}