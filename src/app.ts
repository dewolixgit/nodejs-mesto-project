import express, { NextFunction, Request, Response } from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import { errors as celebrateErrors } from 'celebrate';
import getMongoDbConnectString from './helpers/getMongoDbConnectString';
import usersRouter from './routers/users';
import ERROR_MESSAGES from './config/error';
import RESPONSE_CODE from './config/responseCode';

dotenv.config();

const {
  PORT, DB_HOST, DB_PORT, DB_NAME,
} = process.env;

const start = async () => {
  const app = express();

  app.use(express.json());
  app.use(usersRouter);
  app.use(celebrateErrors());

  app.use((err: any, req: Request, res: Response, next: NextFunction) => {
    res
      .status(err.status || RESPONSE_CODE.internalError)
      .send(err.message || ERROR_MESSAGES.internalError);
  });

  await mongoose.connect(getMongoDbConnectString({
    dbHost: DB_HOST,
    dbPort: DB_PORT,
    dbName: DB_NAME,
  }));

  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
};

start();
