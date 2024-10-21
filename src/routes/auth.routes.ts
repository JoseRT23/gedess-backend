import { Router } from "express"
import { AuthController } from "../controllers/auth.controller";
import { schemaValition } from "../middlewares/schemaValidator.middleware";
import { loginSchema } from "../schemas/auth-schema";

class AlertRouter {
    public router: Router = Router();
    authController = new AuthController();

    constructor() {
        this.init();
    }

    init() {
        this.router.post('/login', schemaValition(loginSchema), this.authController.login);
        this.router.post('/register', this.authController.register);
    }

}

export default new AlertRouter().router;