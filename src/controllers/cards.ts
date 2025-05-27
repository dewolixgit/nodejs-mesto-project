import { Request, Response } from 'express';
import Card from '../models/card';
import ERROR_MESSAGES from '../config/error';
import getErrorResponseBody from '../helpers/getErrorResponseBody';
import RESPONSE_CODE from '../config/responseCode';
import { SessionRequest } from '../types/request';

export const getCards = async (req: Request, res: Response) => {
  try {
    const cards = await Card.find();
    res.send(cards);
  } catch (err) {
    res
      .status(RESPONSE_CODE.internalError)
      .send(getErrorResponseBody(ERROR_MESSAGES.internalError));
  }
};

export const createCard = async (req: Request, res: Response) => {
  const sessionRequest = req as SessionRequest;

  const { name, link } = sessionRequest.body;

  try {
    const card = await Card.create({ name, link, owner: sessionRequest.user._id });
    res.status(RESPONSE_CODE.created).send(card);
  } catch (err) {
    res
      .status(RESPONSE_CODE.internalError)
      .send(getErrorResponseBody(ERROR_MESSAGES.internalError));
  }
};

export const deleteCard = async (req: Request, res: Response) => {
  try {
    const card = await Card.findByIdAndDelete(req.params.cardId);

    if (!card) {
      res
        .status(RESPONSE_CODE.notFound)
        .send(getErrorResponseBody(ERROR_MESSAGES.cardNotFound));
      return;
    }

    res.send(card);
  } catch (err) {
    res
      .status(RESPONSE_CODE.internalError)
      .send(getErrorResponseBody(ERROR_MESSAGES.internalError));
  }
};
