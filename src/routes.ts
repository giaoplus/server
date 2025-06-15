import Router from 'koa-router';
import fs from 'fs';

const router = new Router();

const routes = fs.readdirSync(__dirname + '/modules');

routes.forEach((route) => {
  const routePath = __dirname + '/modules/' + route;
  const routeModule = require(routePath);
  router.use(routeModule.routes()).use(routeModule.allowedMethods());
})

export default router;
