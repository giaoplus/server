import { AppContext } from "@/types/context";
import { DefaultState, DefaultContext } from "koa";
import userRouter from "./user/user.route";

export function registerModules(app: import("koa") <DefaultState, DefaultContext>) {
  app.use(userRouter.routes()).use(userRouter.allowedMethods())
  
  // 添加欢迎路由
  app.use(async (ctx: AppContext, next: () => Promise<any>) => {
    if (ctx.path === '/') {
      ctx.body = 'Welcome to Koa CMS!';
    }
    await next();
  });
}