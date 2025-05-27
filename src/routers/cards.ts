import express from 'express';
import {
  getCards,
  createCard,
  deleteCard,
  likeCard,
  dislikeCard,
} from '../controllers/cards';
import {
  validateCreateCard,
  validateCardId,
} from '../models/card';

const router = express.Router();

router.get('/cards', getCards);
router.post('/cards', validateCreateCard, createCard);
router.delete('/cards/:cardId', validateCardId, deleteCard);
router.put('/cards/:cardId/likes', validateCardId, likeCard);
router.delete('/cards/:cardId/likes', validateCardId, dislikeCard);

export default router;
