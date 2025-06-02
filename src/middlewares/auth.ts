import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import ResponseError from '../utils/ResponseError';
import RESPONSE_CODE from '../utils/consts/responseCode';
import ERROR_MESSAGES from '../utils/consts/error';
import CONFIG from '../utils/consts/config';
import getCookie from '../utils/getCookie';

export default (req: Request, _: Response, next: NextFunction) => {
  const jwtValue = getCookie('jwt', req.headers.cookie);

  if (!jwtValue) {
    next(new ResponseError({
      message: ERROR_MESSAGES.authRequired,
      status: RESPONSE_CODE.unauthorized,
    }));
    return;
  }

  let payload;

  try {
    payload = jwt.verify(jwtValue, CONFIG.jwtSecret);
  } catch (err) {
    next(new ResponseError({
      message: ERROR_MESSAGES.invalidToken,
      status: RESPONSE_CODE.unauthorized,
    }));
    return;
  }

  req.user = payload as { _id: string };

  next();
};
