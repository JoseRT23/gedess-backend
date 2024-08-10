"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.pool = void 0;
const promise_1 = require("mysql2/promise");
exports.pool = (0, promise_1.createPool)({
    host: 'localhost',
    port: 5432,
    database: 'gedess-db',
    user: 'root',
    password: '12345'
});
