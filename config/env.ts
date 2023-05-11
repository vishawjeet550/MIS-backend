import * as dotenv from 'dotenv';
const path = require('path');

const env = process.env.NODE_ENV || 'dev';
const envPath = path.resolve(process.cwd(), `.env.${env}`);

dotenv.config({ path: envPath });

export default {
    port: process.env.PORT || 3000,
    username: process.env.DB_USER || 'root',
    password: process.env.DB_PASS || 'password',
    database: process.env.DB_NAME || 'report',
    host: process.env.DB_HOST || '127.0.0.1',
    dialect: process.env.DB_DIALECT || 'mysql',
    redis_host: process.env.REDIS_HOST || 'localhost',
    redis_port: process.env.REDIS_PORT || 6379
};
