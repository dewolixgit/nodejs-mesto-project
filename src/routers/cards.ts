import express from 'express';
import { getCards, createCard, deleteCard } from '../controllers/cards';
import { validateCardId, validateCreateCard } from '../models/card';

const router = express.Router();

router.get('/cards', getCards);
router.post('/cards', validateCreateCard, createCard);
router.delete('/cards/:cardId', validateCardId, deleteCard);

export default router;
