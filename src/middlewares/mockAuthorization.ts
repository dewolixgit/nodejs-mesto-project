import { Request, Response, NextFunction } from 'express';

const mockAuthorization = (req: Request, res: Response, next: NextFunction) => {
  req.user = {
    _id: '6834be70a38722f59ab1cfea',
  };

  next();
};

export default mockAuthorization;
