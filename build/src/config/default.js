"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
class Config {
    constructor() {
        dotenv_1.default.config();
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
    get(key) {
        var _a;
        const val = (_a = this._config[key]) !== null && _a !== void 0 ? _a : null;
        if (!val) {
            throw new Error(`Config for key [${key}] not found`);
        }
        return val;
    }
    set(key, val) {
        this._config[key] = val;
    }
}
const config = new Config();
exports.default = config;
