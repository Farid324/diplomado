//src/database/database.js
import config from '../config/env.js';
import { Sequelize } from 'sequelize';

export const sequelize = new Sequelize(
    config.DB_DATABASE, //db name
    config.DB_USER, //db user
    config.DB_PASSWORD, //db password
    {
        host: config.DB_HOST, //db host
        port: config.DB_PORT,
        dialect: config.DB_DIALECT, //db dialect
        logging: console.log,
        dialectOptions: config.DB_USE_SSL === 'true' 
        ? {
            ssl: {
                require: true,
                rejectUnauthorized: false, // This is important for self-signed certificates
            },
        }
        :{},
    }
);
