import { config } from "dotenv";
config()
/**
 * env dev
 */
export const ENVIRONMENT = process.env.ENVIRONMENT || 'develop';
export const SECRET = process.env.SECRET || 'covid19-jwt-secert-pass';
export const TIME = process.env.TIME || '60';
export const PORT = process.env.PORT || '9090';

/**
 * DB config
 */
export const MYSQL_USER = process.env.MYSQL_USER || 'root';
export const MYSQL_PASS = process.env.MYSQL_PASS || 'root';
