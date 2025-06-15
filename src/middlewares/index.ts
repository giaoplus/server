import loggerMiddleware from './loggerMiddleware';
import errorHandlerMiddleware from './errorHandler';
import bodyParser from 'koa-bodyparser';
import { Context } from 'koa';

// 声明自定义上下文扩展
declare module 'koa' {
  interface Context {
    success: (data: any, status?: number) => void;
    error: (status: number, message: string, details?: any) => void;
  }
}

// 应用所有中间件
export const applyMiddlewares = (app: any) => {
  // 日志中间件
  app.use(loggerMiddleware);
  
  // 错误处理中间件
  app.use(errorHandlerMiddleware);
  
  // Body解析器
  app.use(bodyParser());
  
  // 响应格式化中间件
  app.use(async (ctx: Context, next: () => Promise<any>) => {
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