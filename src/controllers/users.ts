import bcrypt from 'bcrypt';
import jwt, { SignOptions } from 'jsonwebtoken';
import { NextFunction, Request, Response } from 'express';
import User from '../models/user';
import ERROR_MESSAGES from '../utils/consts/error';
import RESPONSE_CODE from '../utils/consts/responseCode';
import ResponseError from '../utils/ResponseError';
import CONFIG from '../utils/consts/config';
import SUCCESS_MESSAGES from '../utils/consts/success';
import MONGO_RESPONSE_CODE from '../utils/consts/mongoResponseCode';
import getIsMongoError from '../utils/getIsMongoError';

export const getUsers = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const users = await User.find();
    res.send(users);
  } catch {
    next(ResponseError.getInternalError());
  }
};

export const getUserById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = await User.findById(req.params.userId);

    if (!user) {
      next(new ResponseError({
        message: ERROR_MESSAGES.userNotFound,
        status: RESPONSE_CODE.notFound,
      }));
      return;
    }

    res.send(user);
  } catch {
    next(ResponseError.getInternalError());
  }
};

export const createUser = async (req: Request, res: Response, next: NextFunction) => {
  const {
    name, about, avatar, email, password,
  } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(
      password,
      CONFIG.usePasswordSalt,
    );

    const user = await User.create({
      name,
      about,
      avatar,
      email,
      password: hashedPassword,
    });

    const { password: _, ...userWithoutPassword } = user.toObject();

    res.status(RESPONSE_CODE.created).send(userWithoutPassword);
  } catch (error) {
    if (getIsMongoError(error) && error.code === MONGO_RESPONSE_CODE.conflict) {
      next(new ResponseError({
        message: ERROR_MESSAGES.userAlreadyExists,
        status: RESPONSE_CODE.conflict,
      }));
      return;
    }

    next(ResponseError.getInternalError());
  }
};

export const updateUser = async (req: Request, res: Response, next: NextFunction) => {
  const { name, about } = req.body;

  try {
    const user = await User.findByIdAndUpdate(
      req.user._id,
      { name, about },
      { new: true, runValidators: true },
    );

    if (!user) {
      next(new ResponseError({
        message: ERROR_MESSAGES.userNotFound,
        status: RESPONSE_CODE.notFound,
      }));
      return;
    }

    res.send(user);
  } catch {
    next(ResponseError.getInternalError());
  }
};

export const updateAvatar = async (req: Request, res: Response, next: NextFunction) => {
  const { avatar } = req.body;

  try {
    const user = await User.findByIdAndUpdate(
      req.user._id,
      { avatar },
      { new: true, runValidators: true },
    );

    if (!user) {
      next(new ResponseError({
        message: ERROR_MESSAGES.userNotFound,
        status: RESPONSE_CODE.notFound,
      }));
      return;
    }

    res.send(user);
  } catch {
    next(ResponseError.getInternalError());
  }
};

export const login = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email }).select('+password');

    if (!user) {
      next(new ResponseError({
        message: ERROR_MESSAGES.passwordOrEmailIncorrect,
        status: RESPONSE_CODE.unauthorized,
      }));
      return;
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);

    if (!isPasswordCorrect) {
      next(new ResponseError({
        message: ERROR_MESSAGES.passwordOrEmailIncorrect,
        status: RESPONSE_CODE.unauthorized,
      }));
      return;
    }

    const token = jwt.sign(
      { _id: user._id },
      CONFIG.jwtSecret,
      { expiresIn: (CONFIG.jwtExpiresIn as SignOptions['expiresIn']) },
    );

    res
      .cookie('jwt', token, {
        httpOnly: true,
        sameSite: true,
        maxAge: CONFIG.jwtMaxAge,
      })
      .send({ message: SUCCESS_MESSAGES.authorizationIsSuccessful });
  } catch {
    next(ResponseError.getInternalError());
  }
};
