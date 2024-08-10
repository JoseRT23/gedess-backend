import { Server as HttpServer } from 'http';
import { Server as SocketIOServer } from "socket.io";

class SocketService {
    private static instance: SocketIOServer;

    constructor() { }

    public static getInstance(httpServer?: HttpServer) {
        if (!SocketService.instance) {
            if (!httpServer) {
                throw new Error('HTTP server instance must be provided to initialize Socket.io');
            }
            SocketService.instance = new SocketIOServer(httpServer, {
                cors: { origin: 'http://localhost:4200' }
            });
        }

        return SocketService.instance;
    }
}

export default SocketService;