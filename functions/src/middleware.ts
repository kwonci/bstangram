import * as yup from 'yup';
import { Request, Response, NextFunction } from 'express';
import * as _ from "lodash";
import { getAuth } from 'firebase-admin/auth'
import { getApp } from 'firebase-admin/app'

const auth = getAuth(getApp());

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

export const authenticateMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.authorization?.split("Bearer ")[1];
  if (_.isUndefined(token)) {
    res.status(401).json({ error: "unauthorized" });
    return;
  }
  // next();
  auth.verifyIdToken(token).then((decodedToken) => {
    // TODO: fill req.user with decodedToken
    next();
  }).catch((err) => {
    res.status(401).json({ error: "unauthorized" });
  });
}
