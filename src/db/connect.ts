import { Sequelize } from 'sequelize-typescript';
import config from "../config/default";
import log from "../logger";
import { Content } from "../model/content.model";
import { Likes } from "../model/likes.model";
import { User } from "../model/user.model";

const connect = async () => {
    const dbUsername = config.get("dbUsername") as string;
    const dbPassword = config.get("dbPassword") as string;
    const dbHost = config.get("dbHost") as string;
    const dbPort = config.get("dbPort") as number;
    const dbName = config.get("dbName") as string;

    const sequelize = new Sequelize({
        dialect: 'postgres', host: dbHost,
        port: dbPort,
        database: dbName,
        username: dbUsername,
        password: dbPassword,
        logging: false,
        models: [User, Likes, Content],
    });
    try {
        await sequelize.authenticate();
        log.info('DB Connection has been established successfully.');
    } catch (error) {
        log.error('Unable to connect to the database:', error);
    }
}

export default connect;