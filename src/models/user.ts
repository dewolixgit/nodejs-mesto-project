import { celebrate, Joi, Segments } from 'celebrate';
import mongoose from 'mongoose';
import ERROR_MESSAGES from '../config/error';

export interface IUser extends mongoose.Document {
  name: string;
  about: string;
  avatar: string;
}

const userSchema = new mongoose.Schema<IUser>({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  about: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 200,
  },
  avatar: {
    type: String,
    required: true,
  },
}, {
  versionKey: false,
});

export const validateCreateUser = celebrate({
  [Segments.BODY]: Joi.object().keys({
    name: Joi.string().min(2).max(30).required(),
    about: Joi.string().min(2).max(200).required(),
    avatar: Joi.string().uri().required(),
  }),
});

export const validateUserId = celebrate({
  [Segments.PARAMS]: Joi.object().keys({
    userId: Joi.string().hex().length(24).required(),
  }),
});

export default mongoose.model<IUser>('user', userSchema);
