"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importStar(require("express"));
const connection_1 = require("./db/connection");
const http_1 = __importDefault(require("http"));
const socket_io_1 = require("socket.io");
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
const server = http_1.default.createServer(app);
const io = new socket_io_1.Server(server, {
    cors: {
        origin: 'http://localhost:4200',
    }
});
const port = 3000;
// Middleware to parse JSON
app.use((0, express_1.json)());
// Middleware for CORS
const corsOptions = {
    origin: 'http://localhost:4200',
};
app.use((0, cors_1.default)(corsOptions));
// Endpoint POST to save data and emit event
app.post('/data', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { value } = req.body;
        const queryconfig = 'SELECT min_value, max_value FROM parameter;';
        const [config] = yield connection_1.pool.query(queryconfig);
        if (config && config.length > 0) {
            const queryalert = 'INSERT INTO alert (value, date, type) VALUES (?, ?, ?);';
            const body = {
                value: value,
                date: new Date(),
                type: ''
            };
            if (value * 1 < config[0].min_value) {
                body.type = 'down';
                yield connection_1.pool.query(queryalert, [body.value, new Date(), body.type]);
                // Emit alert event
                io.emit('alert', body);
            }
            else if (value * 1 > config[0].max_value) {
                body.type = 'exceed';
                yield connection_1.pool.query(queryalert, [body.value, new Date(), body.type]);
                // Emit alert event
                io.emit('alert', body);
            }
        }
        // Save data
        const query = `INSERT INTO weather (temperature, date) values(?, ?);`;
        yield connection_1.pool.query(query, [value, new Date()]);
        const [lastInserted] = yield connection_1.pool.query('SELECT * FROM weather WHERE id = LAST_INSERT_ID();');
        // Emit event
        io.emit('newData', lastInserted[0]);
        res.status(201).send(lastInserted[0]);
    }
    catch (error) {
        if (error instanceof Error) {
            console.log(error);
            res.status(500).send(error.message);
        }
    }
}));
// Endpoint GET to search data
app.get('/data', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const [data] = yield connection_1.pool.query(`select * 
                                      from (select *
                                                from weather
                                              order by date desc
                                              limit 10) t
                                      order by date ASC;`);
        res.status(200).send(data);
    }
    catch (error) {
        if (error instanceof Error) {
            console.log(error);
            res.status(500).send(error.message);
        }
    }
}));
// Endpoint GET to search data
app.get('/data/search', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let { startdate, enddate } = req.query;
        startdate += ' 00:00:00';
        enddate += ' 23:59:59';
        const [data] = yield connection_1.pool.query(`SELECT * FROM weather WHERE date BETWEEN ? AND ?;`, [startdate, enddate]);
        res.status(200).send(data);
    }
    catch (error) {
        if (error instanceof Error) {
            console.log(error);
            res.status(500).send(error.message);
        }
    }
}));
// Endpoint POST to save configuration parameters
app.post('/parameters', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const parameter = req.body;
        const queryinsert = `INSERT INTO parameter(min_value, max_value, minchart, maxchart) VALUES ( ? , ? , ? , ?);`;
        //Save parameters
        yield connection_1.pool.query(queryinsert, [
            parameter.min_value,
            parameter.max_value,
            parameter.minchart,
            parameter.maxchart,
        ]);
        const [lastInserted] = yield connection_1.pool.query('SELECT * FROM parameter WHERE id = LAST_INSERT_ID();');
        res.status(201).send(lastInserted[0]);
    }
    catch (error) {
        if (error instanceof Error) {
            console.log(error);
            res.status(500).send(error.message);
        }
    }
}));
// Endpoint PUT to update configuration parameters
app.put('/parameters', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const parameter = req.body;
        const queryupdate = `UPDATE parameter SET min_value=?, max_value=?, minchart=?, maxchart=? WHERE ?;`;
        //Save parameters
        yield connection_1.pool.query(queryupdate, [
            parameter.min_value,
            parameter.max_value,
            parameter.minchart,
            parameter.maxchart,
            1,
        ]);
        res.status(200).send(req.body);
    }
    catch (error) {
        if (error instanceof Error) {
            console.log(error);
            res.status(500).send(error.message);
        }
    }
}));
// Endpoint GET to get configuration parameters
app.get('/parameters', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const queryconfig = 'SELECT * FROM parameter;';
        const [config] = yield connection_1.pool.query(queryconfig);
        res.status(200).send(config[0]);
    }
    catch (error) {
        if (error instanceof Error) {
            console.log(error);
            res.status(500).send(error.message);
        }
    }
}));
// Endpoint GET to get configuration parameters
app.get('/alerts', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const queryalert = 'SELECT id, value, date, type FROM alert ORDER BY date DESC;';
        const [alert] = yield connection_1.pool.query(queryalert);
        res.status(200).send(alert);
    }
    catch (error) {
        if (error instanceof Error) {
            console.log(error);
            res.status(500).send(error.message);
        }
    }
}));
io.on('connection', (socket) => {
    console.log('a user connected');
    socket.on('disconnect', () => {
        console.log('user disconnected');
    });
});
server.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
