import { Router } from "express"
import { ParameterController } from "../controllers/parameter.controller";

class ParameterRouter {
    public router: Router = Router();
    parameterController = new ParameterController();

    constructor() {
        this.init();
    }

    init() {
        this.router.get('/:iduser', this.parameterController.getParametersByUser);
        this.router.post('/', this.parameterController.saveParameter);
        this.router.put('/:iduser', this.parameterController.updateParameter);
    }

}

export default new ParameterRouter().router;