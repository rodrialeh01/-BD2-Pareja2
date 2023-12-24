import dotenv from 'dotenv';

dotenv.config()

export const MongoConfig = {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DATABASE,
    port: process.env.DB_PORT_MONGO
};

export const Neo4jConfig = {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DATABASE,
    port: process.env.DB_PORT_NEO4J,
    dbpassword: process.env.DATABASEPASS
}

export const API_PORT = process.env.API_PORT || 4000;