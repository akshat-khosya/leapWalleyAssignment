import env from 'dotenv';
import log from '../logger';

class Config {
    _config: Record<string, any>;
    constructor() {
        env.config();
        this._config = {
            port: process.env.PORT,
            host: process.env.HOST || "localhost",
            dbUsername: process.env.DB_USERNAME,
            dbPassword: process.env.DB_PASSWORD,
            dbHost: process.env.DB_HOST,
            dbPort: process.env.DB_PORT,
            dbName: process.env.DB_NAME
        };


    }

    get(key: string): any {
        const val: any = this._config[key] ?? null;

        if (!val) {
            throw new Error(`Config for key [${key}] not found`);
        }

        return val;
    }
    set(key: string, val: any): void {
        this._config[key] = val;
    }
}


const config = new Config();

export default config;