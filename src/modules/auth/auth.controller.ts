import jwt from 'jsonwebtoken';
import { AppContext } from '@/types/context';
import { AuthService } from './auth.service';
import { LoginDTO, RegisterDTO, JwtPayload, UserDTO } from './auth.types';
import { getUserById } from '../user/user.service';
import config from '@/config';

export class AuthController {
  // 用户登录
  static async login(ctx: AppContext) {
    const { phone, password } = ctx.request.body as LoginDTO;
    
    try {
      const tokens = await AuthService.login(phone, password);
      ctx.success(tokens);
    } catch (error: any) {
      ctx.error(401, error.message);
    }
  }

  // 用户注册
  static async register(ctx: AppContext) {
    const data = ctx.request.body as RegisterDTO;
    
    try {
      const tokens = await AuthService.register(data);
      ctx.success(tokens, 201);
    } catch (error: any) {
      ctx.error(400, error.message);
    }
  }

  // 刷新访问令牌
  static async refreshToken(ctx: AppContext) {
    // 添加类型断言，明确请求体结构
    const requestBody = ctx.request.body as { refreshToken?: string };
    const { refreshToken } = requestBody;
    
    if (!refreshToken) {
      return ctx.error(400, '缺少刷新令牌');
    }
    
    try {
      const decoded = jwt.verify(refreshToken, config.auth.jwtSecret) as JwtPayload;
      
      const user = await getUserById(decoded.userId);
      if (!user) {
        throw new Error('用户不存在');
      }

      const payload: JwtPayload = {
        userId: user.id,
        phone: user.phone,
        role: user.role
      };

      return {
        accessToken: AuthService.generateAccessToken(payload),
        refreshToken: AuthService.generateRefreshToken(payload),
        expiresIn: config.auth.accessTokenExpirySeconds
      };
    } catch (error: any) {
      ctx.error(401, error.message);
    }
  }

  // 获取当前用户信息
  static async currentUser(ctx: AppContext) {
    if (!ctx.state.user) {
      return ctx.error(401, '未认证');
    }
    
    try {
      const user = await getUserById(ctx.state.user.id);
      if (!user) {
        return ctx.error(404, '用户不存在');
      }
      
      // 不返回密码
      const { password, ...userData } = user;
      ctx.success(userData as UserDTO);
    } catch (error) {
      ctx.error(500, '获取用户信息失败');
    }
  }
}