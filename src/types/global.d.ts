import 'koa';
import { ApplicationContext } from './context';

// 扩展 Koa 的 Context 类型
declare module 'koa' {
  interface Context extends ApplicationContext {
    body: {
      success: boolean;
      state?: {
        user?: {
          id: string;
          phone: string;
          role: string;
        };
      };
      data?: any;
      error?: {
        message: string;
        details?: any;
      };
    };
  }
}

// 扩展 @koa/router 的路由参数上下文
declare module 'koa-router' {
  interface RouterParamContext<StateT = any, CustomT = ApplicationContext> {
    params: Record<string, string>;
    state: StateT;
  }
}