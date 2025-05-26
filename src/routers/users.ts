import express from 'express';
import { getUsers, getUserById, createUser } from '../controllers/users';
import { validateCreateUser, validateUserId } from '../models/user';

const router = express.Router();

router.get('/users', getUsers);
router.get('/users/:userId', validateUserId, getUserById);
router.post('/users', validateCreateUser, createUser);

export default router;
