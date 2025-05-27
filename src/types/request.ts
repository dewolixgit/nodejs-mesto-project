import { Request } from 'express';

export type SessionRequest = Request & {
  user: {
    _id: string,
  },
};
