import Joi from 'joi';

export const sendmsg = {
  body: Joi.object().keys({
    message: Joi.string().required(),
  })
};
