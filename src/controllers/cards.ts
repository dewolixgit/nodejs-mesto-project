import { Request, Response } from 'express';
import Card from '../models/card';
import ERROR_MESSAGES from '../utils/consts/error';
import getErrorResponseBody from '../utils/getErrorResponseBody';
import RESPONSE_CODE from '../utils/consts/responseCode';

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
  const { name, link } = req.body;

  try {
    const card = await Card.create({ name, link, owner: req.user._id });
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

export const likeCard = async (req: Request, res: Response) => {
  try {
    const card = await Card.findByIdAndUpdate(
      req.params.cardId,
      { $addToSet: { likes: req.user._id } },
      { new: true },
    );

    if (!card) {
      res.status(RESPONSE_CODE.notFound).send(getErrorResponseBody(ERROR_MESSAGES.cardNotFound));
      return;
    }

    res.send(card);
  } catch (err) {
    res
      .status(RESPONSE_CODE.internalError)
      .send(getErrorResponseBody(ERROR_MESSAGES.internalError));
  }
};

export const dislikeCard = async (req: Request, res: Response) => {
  try {
    const card = await Card.findByIdAndUpdate(
      req.params.cardId,
      { $pull: { likes: req.user._id } },
      { new: true },
    );

    if (!card) {
      res.status(RESPONSE_CODE.notFound).send(getErrorResponseBody(ERROR_MESSAGES.cardNotFound));
      return;
    }

    res.send(card);
  } catch (err) {
    res
      .status(RESPONSE_CODE.internalError)
      .send(getErrorResponseBody(ERROR_MESSAGES.internalError));
  }
};
