import { Router } from "express"
import { AuthController } from "../controllers/auth.controller";

class AlertRouter {
    public router: Router = Router();
    authController = new AuthController();

    constructor() {
        this.init();
    }

    init() {
        this.router.post('/login', this.authController.login);
        this.router.post('/register', this.authController.register);
    }

}

export default new AlertRouter().router;