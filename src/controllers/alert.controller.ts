import alertService from "../services/alert.service";
import { Request, Response, NextFunction } from 'express';

export class AlertController {

    async getAlertsByUser(req: Request, res: Response) {
        try {
          const { iduser } = req.params as any;
          if (!iduser) throw { status: 400, message: 'El id del usuario es requerido' };
          const alerts = await alertService.getAlertsByUser(iduser);
          res.status(200).send(alerts);
        } catch (error) {
            if (error instanceof Error) {
                console.log(error);
                res.status(500).send(error.message);
              }
        }
    }

    async saveAlert(req: Request, res: Response, next: NextFunction) {
      try {
        const alert = req.body;
        const newalert = await alertService.saveAlert(alert);
      } catch (error) {
        next(error);
      }
    }
}