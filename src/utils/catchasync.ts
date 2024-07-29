import { NextFunction, Request, Response } from '../types';

const catchAsync =
  (fn: any) =>
  (req: Request, res: Response, next: NextFunction): void => {
    Promise.resolve(fn(req, res, next)).catch((err) => next(err));
  };

export default catchAsync;
