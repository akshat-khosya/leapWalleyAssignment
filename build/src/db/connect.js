"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_typescript_1 = require("sequelize-typescript");
const default_1 = __importDefault(require("../config/default"));
const logger_1 = __importDefault(require("../logger"));
const content_model_1 = require("../model/content.model");
const likes_model_1 = require("../model/likes.model");
const user_model_1 = require("../model/user.model");
const connect = () => __awaiter(void 0, void 0, void 0, function* () {
    const dbUsername = default_1.default.get("dbUsername");
    const dbPassword = default_1.default.get("dbPassword");
    const dbHost = default_1.default.get("dbHost");
    const dbPort = default_1.default.get("dbPort");
    const dbName = default_1.default.get("dbName");
    const sequelize = new sequelize_typescript_1.Sequelize({
        dialect: 'postgres', host: dbHost,
        port: dbPort,
        database: dbName,
        username: dbUsername,
        password: dbPassword,
        logging: false,
        models: [user_model_1.User, likes_model_1.Likes, content_model_1.Content],
    });
    try {
        yield sequelize.authenticate();
        logger_1.default.info('DB Connection has been established successfully.');
    }
    catch (error) {
        logger_1.default.error('Unable to connect to the database:', error);
    }
});
exports.default = connect;
