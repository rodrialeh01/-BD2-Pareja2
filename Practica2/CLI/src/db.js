import dotenv from 'dotenv';
import mysql from 'mysql2/promise';
dotenv.config();
console.log(process.env.DB_USER);
export const db_root = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_ROOT_NAME,
    port: process.env.DB_PORT
});

export const db_users = (user, password) => {
    return mysql.createPool({
        host: process.env.DB_HOST,
        user: user,
        password: password,
        database: process.env.DB_NAME,
        port: process.env.DB_PORT
    });
};