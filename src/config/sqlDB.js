import { Sequelize } from "sequelize";
import { config } from "dotenv";

config();

export const sequelize = new Sequelize('test', 'avnadmin', process.env.PASSWORD, {
    host: process.env.SQL_PORT,
    dialect: 'mysql',
    port: 28929,
    dialectOptions: {
        connectTimeout: 20000
    },
    logging: console.log 
});

