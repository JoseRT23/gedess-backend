import { Request, Response, NextFunction} from 'express';

export const errorHandlerMiddleware = (err: any, req: Request, res: Response, next: NextFunction) => {
    const { status, message } = err;
    if (status&&message) {
        res.status(err.status).json({ status, message });        
    }else {
        res.status(500).json({ status: 500, message: "Ha ocurrido un problema prosesando su solicitud" });
    }
}