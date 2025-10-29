import Router from 'koa-router';
import fs from 'fs';

const router = new Router();

const routes = fs.readdirSync(__dirname + '/modules');

routes.forEach((route) => {
  const routePath = __dirname + '/modules/' + route;
  if (fs.lstatSync(routePath).isDirectory()) {
    const routeFiles = fs.readdirSync(routePath);
    routeFiles.forEach((file) => {
      if (file.endsWith('.route.ts')) {
        const routeModule = require(routePath + '/' + file);
        if (routeModule.default) {
          router.use(routeModule.default.routes());
          router.use(routeModule.default.allowedMethods());
        }
      }
    })
  }
})

router.get('/', (ctx) => {
  ctx.body = 'welcome to koa cms!';
});

export default router;
