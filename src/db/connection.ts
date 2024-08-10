import { createPool } from "mysql2/promise";

export const pool = createPool({
    host: 'localhost',
    port: 5432,
    database: 'gedess-db',
    user: 'root',
    password: '12345'
});