import { Request, Response, NextFunction} from 'express';
import authService from '../services/auth.service';

export class AuthController {

    async login(req: Request, res: Response, next: NextFunction) {
        try {
            const credentials = req.body;
            const user = await authService.login(credentials);
            res.status(200).send(user);
        } catch (error) {
            next(error);
        }
    }

    async register(req: Request, res: Response, next: NextFunction) {
        try {
        const user = req.body;
        const newuser = await authService.register(user);
        res.status(201).send(newuser);
        } catch (error) {
            next(error);
        }
    }
}