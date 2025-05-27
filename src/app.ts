import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import { errors as celebrateErrors } from 'celebrate';
import getMongoDbConnectString from './utils/getMongoDbConnectString';
import usersRouter from './routers/cards';
import cardsRouter from './routers/users';
import ERROR_MESSAGES from './utils/consts/error';
import RESPONSE_CODE from './utils/consts/responseCode';
import getErrorResponseBody from './utils/getErrorResponseBody';
import mockAuthorization from './middlewares/mockAuthorization';
import catchAllErrors from './middlewares/catchAllErrors';

dotenv.config();

const {
  PORT, DB_HOST, DB_PORT, DB_NAME,
} = process.env;

const start = async () => {
  const app = express();

  app.use(mockAuthorization);
  app.use(express.json());
  app.use(usersRouter);
  app.use(cardsRouter);
  app.use(celebrateErrors());

  await mongoose.connect(getMongoDbConnectString({
    dbHost: DB_HOST,
    dbPort: DB_PORT,
    dbName: DB_NAME,
  }));

  app.all('*', (req, res) => {
    res.status(RESPONSE_CODE.notFound).send(getErrorResponseBody(ERROR_MESSAGES.notFound));
  });

  app.use(catchAllErrors);

  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
};

start();
