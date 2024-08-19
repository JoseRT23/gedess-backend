import { Router } from "express"
import { AlertController } from "../controllers/alert.controller";

class AlertRouter {
    public router: Router = Router();
    alertController = new AlertController();

    constructor() {
        this.init();
    }

    init() {
        this.router.get('/:iduser', this.alertController.getAlertsByUser);
        this.router.post('/', this.alertController.saveAlert);
    }

}

export default new AlertRouter().router;