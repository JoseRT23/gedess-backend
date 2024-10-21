import express, { json } from 'express';
import http from 'http';
import cors from "cors";
import { Twilio } from 'twilio';
import { env } from './libs/dotenv.adapter';
import Routes from './routes';
import { errorHandlerMiddleware } from './middlewares/errorHandler.middleware';
import SocketService from './services/socketio.service';
import { limiter } from './libs/rate-limit.adapter';

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
    this.app.use(limiter);
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

// const sendMessage = async(type: string, value: string) => {
//   const account: string = env.get('ACCOUNTSID');
//   const token: string  = env.get('AUTHTOKEN');
//   const number: string  = env.get('PHONENUMBER');

//   const client = new Twilio(account, token);

//   const message = await client.messages.create({
//     body: `Se registro un ${type==='down' ? 'bajo nivel' : 'alto nivel'} ${value}°C de la temperatura. Fecha: ${new Date()}`,
//     from: number,
//     to: `+573214803385`
//   });

//   console.log(message.sid, message.status);
// }