import { Router } from "express"
import { AlertController } from "../controllers/alert.controller";

class AlertRouter {
    public router: Router = Router();
    alertController = new AlertController();

    constructor() {
        this.init();
    }

    init() {
        this.router.get('/', this.alertController.getAlerts);
    }

}

export default new AlertRouter().router;