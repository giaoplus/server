import { ParameterizedContext } from 'koa';
import { RouterContext } from 'koa-router';

// 定义自定义上下文接口
export interface ApplicationContext {
  success: (data: any, status?: number) => void;
  error: (status: number, message: string, details?: any) => void;
}

// 组合类型：Koa上下文 + 路由上下文 + 自定义上下文
export type AppContext = ParameterizedContext & RouterContext & ApplicationContext;