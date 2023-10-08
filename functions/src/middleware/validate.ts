import * as yup from "yup";
import { Request, Response, NextFunction } from 'express';

export const validateMiddleware = (schema: yup.ObjectSchema<yup.AnyObject>) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await schema.validate({
        body: req.body,
        query: req.query,
        params: req.params
      }, { strict: true });
      next();
    } catch (err: any) {
      if (err instanceof yup.ValidationError) {
        // err.path is the field that failed validation
        res.status(400).json({
          [err.path ?? "unknown"]: err.message,
        });
      } else {
        res.status(500).json({ "message": "internal server error" });
      }
    }
  }
};
