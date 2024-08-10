import alertService from "../services/alert.service";
import { Request, Response, NextFunction } from 'express';

export class AlertController {

    async getAlerts(req: Request, res: Response) {
        try {
          const alerts = await alertService.getAlerts();
          res.status(200).send(alerts);
        } catch (error) {
            if (error instanceof Error) {
                console.log(error);
                res.status(500).send(error.message);
              }
        }
    }
}