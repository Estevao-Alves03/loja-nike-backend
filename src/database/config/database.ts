import { Options } from 'sequelize';
import 'dotenv/config';

const { DB_NAME, DB_USER, DB_PASS, DB_HOST} = process.env

const config: Options = {
 username: DB_USER,
 password: DB_PASS,
 database: DB_NAME,
 host: DB_HOST || 'localhost',
 port: 5432,
 dialect: 'postgres'
}

export = config;
