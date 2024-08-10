import { Application, Router } from "express"
import alertRoutes from "./alert.routes"
import authRoutes from "./auth.routes";
import dataRoutes from "./data.routes";
import parameterRoutes from "./parameter.routes";

export default class Routes {
    
    constructor(app: Application) {
        app.use('/api/alerts', alertRoutes);
        app.use('/api/auth', authRoutes);
        app.use('/api/data', dataRoutes);
        app.use('/api/parameters', parameterRoutes);
    }
}