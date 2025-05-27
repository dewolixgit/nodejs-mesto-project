import express, { NextFunction, Request, Response } from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import { errors as celebrateErrors } from 'celebrate';
import { STATUS_CODES } from 'node:http';
import getMongoDbConnectString from './helpers/getMongoDbConnectString';
import usersRouter from './routers/cards';
import cardsRouter from './routers/users';
import ERROR_MESSAGES from './config/error';
import RESPONSE_CODE from './config/responseCode';
import { SessionRequest } from './types/request';
import getErrorResponseBody from './helpers/getErrorResponseBody';

dotenv.config();

const {
  PORT, DB_HOST, DB_PORT, DB_NAME,
} = process.env;

const start = async () => {
  const app = express();

  app.use((req, res, next) => {
    const sessionRequest = req as SessionRequest;

    sessionRequest.user = {
      _id: '6834be70a38722f59ab1cfea',
    };

    next();
  });

  app.use(express.json());
  app.use(usersRouter);
  app.use(cardsRouter);

  await mongoose.connect(getMongoDbConnectString({
    dbHost: DB_HOST,
    dbPort: DB_PORT,
    dbName: DB_NAME,
  }));

  app.use(celebrateErrors());

  app.all('*', (req, res) => {
    res.status(RESPONSE_CODE.notFound).send(getErrorResponseBody(ERROR_MESSAGES.notFound));
  });

  app.use((err: any, req: Request, res: Response, next: NextFunction) => {
    res
      .status(err.status || RESPONSE_CODE.internalError)
      .send(err.message || ERROR_MESSAGES.internalError);
  });

  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
};

start();
