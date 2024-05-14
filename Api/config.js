import dotenv from 'dotenv';
dotenv.config();

const config = {
    env: process.env.NODE_ENV || 'dev',
    dbUser : process.env.DB_USER,
    dbPassword : process.env.DB_PASSWORD,
    dbName : process.env.DB_NAME,
    dbHost : process.env.DB_HOST,
    dbPort : process.env.DB_PORT,
};

export default config;

