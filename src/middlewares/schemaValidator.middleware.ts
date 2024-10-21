import { NextFunction, Request, Response } from "express";
import { AnyZodObject } from "zod";

export const schemaValition = (schema: AnyZodObject) => (req: Request, res: Response, next: NextFunction) => {

    const validation = schema.safeParse({
       body: req.body,
       params: req.params,
       query: req.query,
     });

     if (validation.success) next();        
 
     return res.status(400).json({
        status: 400,
        errors: validation.error?.issues.map(issue => issue.message),
     });
  };