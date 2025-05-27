import { NextFunction, Request, Response } from 'express';
import RESPONSE_CODE from '../utils/consts/responseCode';
import ERROR_MESSAGES from '../utils/consts/error';

const catchAllErrors = (err: any, req: Request, res: Response, _: NextFunction) => {
  res
    .status(err.status || RESPONSE_CODE.internalError)
    .send(err.message || ERROR_MESSAGES.internalError);
};

export default catchAllErrors;
