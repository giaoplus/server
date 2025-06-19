import { authRouter } from './auth.route';
export { jwtAuth, currentUser } from './auth.middleware';

// 导出所有内容
export * from './auth.types';
export * from './auth.service';
export * from './auth.controller';

// 导出路由
export default {
  authRouter
};