import express from 'express';
import {
  getUsers, getUserById, createUser, updateUser, updateAvatar,
} from '../controllers/users';
import {
  validateCreateUser,
  validateUpdateAvatar,
  validateUpdateUser,
  validateUserId,
} from '../models/user';

const router = express.Router();

router.get('/users', getUsers);
router.get('/users/:userId', validateUserId, getUserById);
router.post('/users', validateCreateUser, createUser);
router.patch('/users/me', validateUpdateUser, updateUser);
router.patch('/users/me/avatar', validateUpdateAvatar, updateAvatar);

export default router;
