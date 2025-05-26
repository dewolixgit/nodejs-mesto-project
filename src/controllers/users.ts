import { Request, Response } from 'express';
import User from '../models/user';
import ERROR_MESSAGES from '../config/error';
import getErrorResponseBody from '../helpers/getErrorResponseBody';
import RESPONSE_CODE from '../config/responseCode';

export const getUsers = async (req: Request, res: Response) => {
  try {
    const users = await User.find();
    res.send(users);
  } catch (err) {
    res
      .status(RESPONSE_CODE.internalError)
      .send(getErrorResponseBody(ERROR_MESSAGES.internalError));
  }
};

export const getUserById = async (req: Request, res: Response) => {
  try {
    const user = await User.findById(req.params.userId);

    if (!user) {
      res.status(RESPONSE_CODE.notFound).send(getErrorResponseBody(ERROR_MESSAGES.userNotFound));
      return;
    }

    res.send(user);
  } catch (err) {
    res
      .status(RESPONSE_CODE.internalError)
      .send(getErrorResponseBody(ERROR_MESSAGES.internalError));
  }
};

export const createUser = async (req: Request, res: Response) => {
  const { name, about, avatar } = req.body;

  try {
    const user = await User.create({ name, about, avatar });
    res.status(RESPONSE_CODE.created).send(user);
  } catch (err) {
    res
      .status(RESPONSE_CODE.internalError)
      .send(getErrorResponseBody(ERROR_MESSAGES.internalError));
  }
};
