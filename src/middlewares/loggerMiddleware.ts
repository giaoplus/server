import { Context, Next } from 'koa';

// 定义日志级别
enum LogLevel {
  DEBUG = 'debug',
  INFO = 'info',
  WARN = 'warn',
  ERROR = 'error'
}

// 获取当前环境的日志级别
const getCurrentLogLevel = (): LogLevel => {
  const env = process.env.NODE_ENV || 'development';
  return env === 'production' ? LogLevel.INFO : LogLevel.DEBUG;
};

// 检查日志级别是否应该被记录
const shouldLog = (messageLevel: LogLevel): boolean => {
  const currentLevel = getCurrentLogLevel();
  const levels = Object.values(LogLevel);
  return levels.indexOf(messageLevel) >= levels.indexOf(currentLevel);
};

// 生成带颜色的日志
const colorizeLog = (level: LogLevel, message: string): string => {
  const colors = {
    [LogLevel.DEBUG]: '\x1b[36m', // Cyan
    [LogLevel.INFO]: '\x1b[32m',  // Green
    [LogLevel.WARN]: '\x1b[33m',  // Yellow
    [LogLevel.ERROR]: '\x1b[31m'  // Red
  };
  const reset = '\x1b[0m';
  return `${colors[level]}${message}${reset}`;
};

// 格式化时间戳
const getFormattedTimestamp = (): string => {
  return new Date().toISOString();
};

// 获取用户信息（如果有）
const getUserInfo = (ctx: Context): string => {
  if (ctx.state.user && ctx.state.user.id) {
    return `[User: ${ctx.state.user.id}]`;
  }
  return '[User: Anonymous]';
};

const loggerMiddleware = async (ctx: Context, next: Next) => {
  const start = Date.now();
  const timestamp = getFormattedTimestamp();
  const userInfo = getUserInfo(ctx);
  
  // 记录请求信息（仅在debug级别记录）
  if (shouldLog(LogLevel.DEBUG)) {
    const requestInfo = {
      method: ctx.method,
      url: ctx.url,
      headers: ctx.headers,
      query: ctx.query,
      body: ctx.request.body
    };
    console.log(
      colorizeLog(
        LogLevel.DEBUG,
        `${timestamp} ${userInfo} Request: ${JSON.stringify(requestInfo)}`
      )
    );
  }
  
  try {
    await next();
    const ms = Date.now() - start;
    
    // 基础日志消息
    const baseMessage = `${timestamp} ${userInfo} ${ctx.method} ${ctx.url} ${ctx.status} - ${ms}ms`;
    
    // 根据状态码记录不同级别的日志
    if (ctx.status >= 500) {
      // 错误级别：记录完整错误信息
      if (ctx.body && (ctx.body as any).error) {
        const errorData = (ctx.body as any).error || {};
        // 格式化错误信息，支持嵌套的message和details结构
        const errorMessage = errorData.message || JSON.stringify(errorData);
        const errorDetails = errorData.details ? ` | Details: ${JSON.stringify(errorData.details)}` : '';
        console.error(
          colorizeLog(
            LogLevel.ERROR,
            `${baseMessage} | Error: ${errorMessage}${errorDetails}`
          )
        );
      } else {
        console.error(colorizeLog(LogLevel.ERROR, baseMessage));
      }
    } else if (ctx.status >= 400) {
      // 警告级别
      console.warn(colorizeLog(LogLevel.WARN, baseMessage));
    } else {
      // 信息级别
      if (shouldLog(LogLevel.INFO)) {
        console.log(colorizeLog(LogLevel.INFO, baseMessage));
      }
    }
  } catch (error) {
    // 捕获并记录未处理的错误
    const ms = Date.now() - start;
    const errorMessage = `Request failed: ${ctx.method} ${ctx.url} - ${ms}ms | Error: ${error instanceof Error ? error.message : String(error)}`;
    console.error(colorizeLog(LogLevel.ERROR, `${timestamp} ${userInfo} ${errorMessage}`));
    
    // 重新抛出错误，让上层错误处理器处理
    throw error;
  }
};

export default loggerMiddleware;