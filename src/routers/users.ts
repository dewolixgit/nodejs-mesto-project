import express from 'express';
import {
  getUsers, getUserById, updateUser, updateAvatar, getCurrentUser,
} from '../controllers/users';
import {
  validateUpdateAvatar,
  validateUpdateUser,
  validateUserId,
} from '../models/user';

const router = express.Router();

router.get('/users', getUsers);
router.get('/users/me', getCurrentUser);
router.get('/users/:userId', validateUserId, getUserById);
router.patch('/users/me', validateUpdateUser, updateUser);
router.patch('/users/me/avatar', validateUpdateAvatar, updateAvatar);

export default router;
