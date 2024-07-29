import express from 'express';
import config from '../../config/config';
import TestRouter from './test.route';

const router = express.Router();

const defaultRoutes = [
  {
    path: '/test',
    route: TestRouter
  },
];

interface RouterList {
  path: string;
  route: any;
}

const devRoutes: RouterList[] = [];

defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

/* istanbul ignore next */
if (config.env === 'development') {
  devRoutes.forEach((route: RouterList) => {
    router.use(route.path, route.route);
  });
}

export default router;
