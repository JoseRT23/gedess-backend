import { Request, Response, NextFunction } from 'express';
import parameterService from '../services/parameter.service';

export class ParameterController {

    async getParametersByUser(req: Request, res: Response) {
        try {
          const { iduser } = req.params;
          const [parameters] = await parameterService.getParametersByUser(Number(iduser));
          res.status(200).send(parameters);
        } catch (error) {
            if (error instanceof Error) {
                console.log(error);
                res.status(500).send(error.message);
            }
        }
    }

    async saveParameter(req: Request, res: Response) {
        try {
          const parameter = req.body;
          const newparameter = await parameterService.saveParameter(parameter);
          res.status(200).send(newparameter);
        } catch (error) {
            if (error instanceof Error) {
                console.log(error);
                res.status(500).send(error.message);
            }
        }
    }

    async updateParameter(req: Request, res: Response) {
        try {
          const { idparameter } = req.params;
          const parameter = req.body;
          const updatedparameter = await parameterService.updateParameter(idparameter, parameter);
          res.status(200).send(updatedparameter);
        } catch (error) {
            if (error instanceof Error) {
                console.log(error);
                res.status(500).send(error.message);
            }
        }
    }
}