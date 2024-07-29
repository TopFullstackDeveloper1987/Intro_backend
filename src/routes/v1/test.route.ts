import express from 'express';
import {
  getdata
} from '../../controllers/test.controller';

const route = express.Router();

// route.post('/sendmsg',validate(sendmsgValidation), sendmsg)
route.post('/getdata', getdata)

export default route;
