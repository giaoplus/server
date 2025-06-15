import Koa from 'koa';
import userRouter from '@modules/user/user.route';
import config from '@/config'
import { applyMiddlewares } from '@/middlewares/index'

const app = new Koa();


// 中间件
applyMiddlewares(app)

// 路由
app.use(userRouter.routes()).use(userRouter.allowedMethods());

app.listen(config.port, () => {
  console.log(`Server is running on port ${config.port}`);
});