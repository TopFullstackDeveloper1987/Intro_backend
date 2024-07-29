import morgan from 'morgan';
import config from './config';
import logger from './logger';
import { Request, Response } from '../types';
import { Logger } from 'winston';

morgan.token(
  'message',
  (req: Request, res: Response) => res.locals.errorMessage || ''
);

const getIpFormat = (): string =>
  config.env === 'production' ? ':remote-addr - ' : '';
const successResponseFormat = `${getIpFormat()}:method :url :status - :response-time ms`;
const errorResponseFormat = `${getIpFormat()}:method :url :status - :response-time ms - message: :message`;

export const successHandler = morgan(successResponseFormat, {
  skip: (req: Request, res: Response): boolean => res.statusCode >= 400,
  stream: { write: (message): Logger => logger.info(message.trim()) }
});

export const errorHandler = morgan(errorResponseFormat, {
  skip: (req: Request, res: Response): boolean => res.statusCode < 400,
  stream: { write: (message): Logger => logger.error(message.trim()) }
});
