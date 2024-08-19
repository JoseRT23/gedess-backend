import { Router } from "express"
import { DataController } from "../controllers/data.controller";

class DataRouter {
    public router: Router = Router();
    dataController = new DataController();

    constructor() {
        this.init();
    }

    init() {
        this.router.get('/', this.dataController.getData);
        this.router.get('/search', this.dataController.searchData);
        this.router.get('/download-excel', this.dataController.generateExcel);
        this.router.post('/download-pdf', this.dataController.generatePdf);
        this.router.post('/', this.dataController.saveData);
    }

}

export default new DataRouter().router;