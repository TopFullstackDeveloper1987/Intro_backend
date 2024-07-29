import httpStatus from 'http-status';
import { SendType } from 'index';

export const successData = (message: string, data: any) => {
  return { status: true, message, data };
};

export const errorData = (message: string, data: any) => {
  return { status: false, message, data };
};

export const sendSuccess = ({
  res,
  data,
  message = 'success',
  code = httpStatus.OK
}: SendType) => {
  res.status(code).send(successData(message, data));
};

export const sendError = ({
  res,
  data,
  message = 'Internal Server Error',
  code = httpStatus.INTERNAL_SERVER_ERROR
}: SendType) => {
  res.status(code).send(errorData(message, data));
};
