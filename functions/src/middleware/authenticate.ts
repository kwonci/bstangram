import { Request, Response, NextFunction } from 'express';
import { auth } from '../firebase/admin'
import * as logger from 'firebase-functions/logger'
import * as _ from 'lodash';

export const authenticateMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.authorization?.split("Bearer ")[1];
  logger.info(`token: ${token}`);

  if (_.isUndefined(token)) {
    res.status(401).json({ error: "unauthorized" });
    return;
  }
  // next();
  auth.verifyIdToken(token).then((decodedToken) => {
    // TODO: fill req.user with decodedToken
    next();
  }).catch((err) => {
    logger.error(`error: ${err}`);
    res.status(401).json({ error: "unauthorized" });
  });
}
