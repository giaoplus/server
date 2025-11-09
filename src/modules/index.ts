import { AppContext } from "@/types/context";
import { DefaultState, DefaultContext } from "koa";
import sysRouter from "./sys/sys.route";
import userRouter from "./user/user.route";
import authRouter from "./auth/auth.route";

export function registerModules(app: import("koa") <DefaultState, DefaultContext>) {
  app.use(sysRouter.routes()).use(sysRouter.allowedMethods())
  app.use(authRouter.routes()).use(authRouter.allowedMethods())
  app.use(userRouter.routes()).use(userRouter.allowedMethods())
  
  
  app.use(async (ctx: AppContext, next: () => Promise<any>) => {
    if (ctx.path === '/') {
      ctx.body = 'Welcome to Koa CMS!';
    }
    await next();
  });
}