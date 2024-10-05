import { plainToInstance } from "class-transformer";
import { validate } from "class-validator";
import { Request, Response, NextFunction } from "express";

export function validationMiddleware(type: any) {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const dtoObject = plainToInstance(type, req.body);
      const errors = await validate(dtoObject);

      if (errors.length > 0) {
        res.status(400).json({ errors: errors.map((err) => err.constraints) });
      }

      next();
      return;
    } catch (err) {
      next(err);
    }
  };
}
