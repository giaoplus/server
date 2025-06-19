import Koa from 'koa';
import { appConfig } from '@/config'
import { applyMiddlewares } from '@/middlewares/index'
import { registerModules } from '@/modules/index'

const app = new Koa();

// 中间件
applyMiddlewares(app)

// 路由
registerModules(app)

app.listen(appConfig.port, () => {
  console.log(`Server is running on port ${appConfig.port}`);
});