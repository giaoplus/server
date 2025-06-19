import loggerMiddleware from './loggerMiddleware';
import errorHandlerMiddleware from './errorHandler';
import bodyParser from 'koa-bodyparser';
import { DefaultContext, DefaultState } from 'koa';
import { AppContext } from '@/types/context'
import { currentUser } from '@/modules/auth';

// 应用所有中间件
export const applyMiddlewares = (app: import("koa") <DefaultState, DefaultContext>) => {
  // 日志中间件
  app.use(loggerMiddleware)

  // 当前中户
  app.use(currentUser)
  
  // Body解析器
  app.use(bodyParser());
  
  // 错误处理中间件
  app.use(errorHandlerMiddleware);
  
  // 响应格式化中间件
  app.use(async (ctx: AppContext, next: () => Promise<any>) => {
    ctx.success = (data: any, status = 200) => {
      ctx.status = status;
      ctx.body = {
        success: true,
        data
      };
    };
    
    ctx.error = (status: number, message: string, details = null) => {
      ctx.status = status;
      ctx.body = {
        success: false,
        error: {
          message,
          details
        }
      };
    };
    
    await next();
  });
};