import httpStatus from 'http-status';
import catchAsync from '../utils/catchasync';
import { Request, Response } from '../types';
import { send_msg, get_msg } from '../services/chatgpt.service';
import { sendError, sendSuccess } from '../utils';

export const sendmsg = catchAsync(
  async (req: Request, res: Response): Promise<void> => {
    let user = req.user;
    console.log(req.body.message)
    let content = req.body.message
    if (content.trim() === "") {
      sendError({
        res,
        code: httpStatus.UNAUTHORIZED,
        message: 'Empty Message'
      });
    }
    let response = await send_msg(content, user)

    sendSuccess({ res, data: response });
  }
);

export const getmsg = catchAsync(
  async (req: Request, res: Response): Promise<void> => {
    let response = await get_msg(req.user);
    sendSuccess({ res, data: response });
  }
);
