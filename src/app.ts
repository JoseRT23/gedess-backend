import express, { json } from 'express';
import http from 'http';
import cors from "cors";
import { Twilio } from 'twilio';
import { env } from './libs/dotenv.adapter';
import Routes from './routes';
import { errorHandlerMiddleware } from './middlewares/errorHandler.middleware';
import SocketService from './services/socketio.service';

class App {
  public app: express.Application;
  public server: any;
  public io: any;
  private _port = 3000;

  constructor() {
    this.app = express();
    this.server = http.createServer(this.app);
    this.io = SocketService.getInstance(this.server);
    this.start();
    new Routes(this.app);
    // Always after init routes
    this.app.use(errorHandlerMiddleware);
  }
  
  start(): void {
    this.app.use(json());// Middleware to parse JSON
    const corsOptions = {
      origin: 'http://localhost:4200',
    }
    this.app.use(cors(corsOptions));// Middleware for CORS

    this.io.on('connection', (socket: any) => {
      console.log('a user connected');
      socket.on('disconnect', () => {
        console.log('user disconnected');
      });
    });
    
    this.server.listen(this._port, () => {
      console.log(`Server is running on http://localhost:${this._port}`);
    });
  }
}

new App();

const sendMessage = async(type: string, value: string) => {
  const account: string = env.get('ACCOUNTSID');
  const token: string  = env.get('AUTHTOKEN');
  const number: string  = env.get('PHONENUMBER');

  const client = new Twilio(account, token);

  const message = await client.messages.create({
    body: `Se registro un ${type==='down' ? 'bajo nivel' : 'alto nivel'} ${value}°C de la temperatura. Fecha: ${new Date()}`,
    from: number,
    to: `+573214803385`
  });

  console.log(message.sid, message.status);
}

// // Endpoint POST to save data and emit event
// app.post('/data', async(req, res) => {
//   try {
//     const { value } = req.body;
//     const queryconfig = 'SELECT min_value, max_value FROM parameter;';
//     const [config] = await pool.query(queryconfig) as any;

//     if (config&&config.length>0) {
//       const queryalert = 'INSERT INTO alert (value, date, type) VALUES (?, ?, ?);';
//       const body = {
//         value: value,
//         date: new Date(),
//         type: ''
//       }

//       if (value*1<config[0].min_value) {
//         body.type = 'down';
//         await pool.query(queryalert, [body.value, new Date(), body.type]); 
//         //await sendMessage(body.type, body.value);
//         // Emit alert event
//         io.emit('alert', body);    
//       }else if(value*1>config[0].max_value) {
//         body.type = 'exceed';
//         await pool.query(queryalert, [body.value, new Date(), body.type]);
//         //await sendMessage(body.type, body.value);
//         // Emit alert event
//         io.emit('alert', body);    
//       }
//     }
  
//     // Save data
//     const query = `INSERT INTO weather (temperature, date) values(?, ?);`
//     await pool.query(query, [value, new Date()]); 
//     const [lastInserted] = await pool.query('SELECT * FROM weather WHERE id = LAST_INSERT_ID();') as any;
  
//     // Emit event
//     io.emit('newData', lastInserted[0]);
  
//     res.status(201).send(lastInserted[0]);    
//   } catch (error) {
//     if (error instanceof Error) {
//       console.log(error);
//       res.status(500).send(error.message);
//     }
//   }
// });
