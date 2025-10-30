import { Context, Next } from 'koa';

const errorHandler = async (ctx: Context, next: Next) => {
  try {
    await next();
  } catch (err: any) {
    ctx.status = err.status || 500;
    ctx.body = {
      success: false,
      error: {
        message: err.message,
        details: err.details || err.stack
      }
    }
  }
}

export default errorHandler;