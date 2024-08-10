import { Request, Response, NextFunction } from 'express';
import dataService from '../services/data.service';

export class DataController {

    async searchData(req: Request, res: Response) {
        try {
          let { startdate, enddate } = req.query as any;
          const data = await dataService.searchData(startdate, enddate);
          res.status(200).send(data);
        } catch (error) {
            if (error instanceof Error) {
                console.log(error);
                res.status(500).send(error.message);
            }
        }
    }

    async getData(req: Request, res: Response) {
        try {
          const data = await dataService.getData();
          res.status(200).send(data);
        } catch (error) {
            if (error instanceof Error) {
                console.log(error);
                res.status(500).send(error.message);
            }
        }
    }

    async saveData(req: Request, res: Response, next: NextFunction) {
        try {
            const { value } = req.body;
            const data = await dataService.saveData(value);
            res.status(201).send(data);
        } catch (error) {
            next(error);
        }
    }
}