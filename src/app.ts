import express from 'express';
import mongoose from 'mongoose';
import { errors as celebrateErrors } from 'celebrate';
import getMongoDbConnectString from './utils/getMongoDbConnectString';
import usersRouter from './routers/cards';
import cardsRouter from './routers/users';
import ERROR_MESSAGES from './utils/consts/error';
import RESPONSE_CODE from './utils/consts/responseCode';
import catchAllErrors from './middlewares/catchAllErrors';
import CONFIG, { initConfig } from './utils/consts/config';
import { validateCreateUser, validateLogin } from './models/user';
import { createUser, login } from './controllers/users';
import auth from './middlewares/auth';
import { errorLogger, requestLogger } from './middlewares/logger';
import ResponseError from './utils/ResponseError';

initConfig();

const start = async () => {
  const app = express();

  await mongoose.connect(getMongoDbConnectString({
    dbHost: CONFIG.dbHost,
    dbPort: CONFIG.dbPort,
    dbName: CONFIG.dbName,
  }));

  app.use(requestLogger);

  app.use(express.json());
  app.post('/signin', validateLogin, login);
  app.post('/signup', validateCreateUser, createUser);
  app.use(auth, usersRouter);
  app.use(auth, cardsRouter);

  app.all('*', (req, res, next) => {
    next(new ResponseError({
      message: ERROR_MESSAGES.notFound,
      status: RESPONSE_CODE.notFound,
    }));
  });

  app.use(errorLogger);

  app.use(celebrateErrors());
  app.use(catchAllErrors);

  app.listen(CONFIG.port, () => {
    console.log(`Server is running on port ${CONFIG.port}`);
  });
};

start();
