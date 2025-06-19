import Router from 'koa-router';
import { AppContext } from '@/types/context';
import { AuthController } from './auth.controller';
import { currentUser } from './auth.middleware';

// 创建认证路由
export const authRouter = new Router<{}, AppContext>({ prefix: '/api/auth' });

// 公开路由
authRouter
  .post('/login', AuthController.login)
  .post('/register', AuthController.register)
  .post('/refresh-token', AuthController.refreshToken);

// 需要认证的路由
authRouter
  .get('/me', currentUser, AuthController.currentUser);