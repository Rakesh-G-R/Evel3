import { Sequelize } from "sequelize";
import { config } from "dotenv";

config();

export const sequelize = new Sequelize('test', 'avnadmin', process.env.SECRETKEY, {
    host: process.env.SQL_HOST,
    dialect: 'mysql',
    port: process.env.SQL_PORT,
    dialectOptions: {
        connectTimeout: 20000
    },
    logging: console.log 
});

