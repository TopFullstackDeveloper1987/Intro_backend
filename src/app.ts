import cors from 'cors';
import helmet from 'helmet';
import express from 'express';
import compression from 'compression';
import useragent from 'express-useragent';
import mongoSanitize from 'express-mongo-sanitize';

import config from './config/config';
import {
  successHandler,
  errorHandler as morganErrorHandler
} from './config/morgan';

import { authLimiter } from './middlewares/ratelimiter';
import { errorConverter, errorHandler } from './middlewares/error';

import routes from './routes/v1';

import { DIR } from './conf';

const app = express();

app.use(successHandler);
app.use(morganErrorHandler);

app.use(helmet());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(mongoSanitize());
app.use(useragent.express());

// gzip compression
app.use(compression());

// enable cors
app.use(cors());
app.options('*', cors());

// limit repeated failed requests to auth endpoints
if (config.env === 'production') {
  app.use('/v1/auth', authLimiter);
}

// v1 api routes
app.use('/api/v1', routes);

// api hooks routes

app.use(express.static(`${DIR}/client/upload`));

// send back a 404 error for any unknown api request
// app.use((req: Request, res: Response, next: NextFunction) => {
//   next(new ApiError(httpStatus.NOT_FOUND, 'Not found'));
// });

// convert error to ApiError, if needed
app.use(errorConverter);

// handle error
app.use(errorHandler);

// module.exports = app;
export { app };
