import { Context, Next } from 'koa';

const errorHandler = async (ctx: Context, next: Next) => {
  try {
    await next();
  } catch (err: any) {
    ctx.status = err.status || 500;
    ctx.body = {
      message: err.message,
      stack: err.stack,
    };
  }
}

export default errorHandler;