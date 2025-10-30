import { AppContext } from '@/types/context';
import { AuthService } from './auth.service';
import { JwtPayload, UserRole } from './auth.types';

// JWT 认证中间件
export const jwtAuth = (roles: UserRole[] = []) => {
  return async (ctx: AppContext, next: () => Promise<any>) => {
    // 从请求头获取令牌
    const authHeader = ctx.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return ctx.error(401, '未提供认证令牌');
    }

    const token = authHeader.split(' ')[1];
    if (!token) {
      return ctx.error(401, '无效的令牌格式');
    }

    try {
      // 验证令牌
      const decoded = AuthService.verifyToken(token);
      
      // 检查角色权限
      if (roles.length > 0 && !roles.includes(decoded.role as UserRole)) {
        return ctx.error(403, '权限不足');
      }

      // 将用户信息附加到上下文
      ctx.state.user = {
        id: decoded.userId,
        phone: decoded.phone,
        role: decoded.role
      };
    } catch (error) {
      return ctx.error(401, '无效或过期的令牌');
    }

    await next();
  };
};

// 获取当前用户中间件
export const currentUser = async (ctx: AppContext, next: () => Promise<any>) => {
  const authHeader = ctx.headers.authorization;
  
  if (authHeader && authHeader.startsWith('Bearer ')) {
    const token = authHeader.split(' ')[1];
    try {
      const decoded = AuthService.verifyToken(token);
      ctx.state.user = {
        id: decoded.userId,
        phone: decoded.phone,
        role: decoded.role
      };
    } catch (error) {
      // 令牌验证失败，不设置用户信息
      return ctx.error(403, '无访问权限', error);
    }
  }
  
  await next();
};