import Joi from 'joi';
import httpStatus from 'http-status';
import pick from '../utils/pick';
import { NextFunction, Request, Response } from '../types';
import { sendError } from '../utils';

const validate =
  (schema: any) =>
  (req: Request, res: Response, next: NextFunction): void => {
    const validSchema = pick(schema, ['params', 'query', 'body']);
    const object = pick(req, Object.keys(validSchema));
    const { value, error } = Joi.compile(validSchema)
      .prefs({ errors: { label: 'key' }, abortEarly: false })
      .validate(object);

    if (error) {
      const errorMessage = error.details
        .map((details) => details.message)
        .join(', ');
      return sendError({
        res,
        message: errorMessage,
        code: httpStatus.BAD_REQUEST
      });
    }
    Object.assign(req, value);
    return next();
  };

export default validate;
