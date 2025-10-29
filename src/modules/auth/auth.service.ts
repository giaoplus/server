import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { JwtPayload, TokenResponse, RegisterDTO } from './auth.types';
import { getUserByPhone, createUser } from '@/modules/user/user.service';
import config from '@/config';

// 密码加密
const saltRounds = 10;

export class AuthService {
  // 生成访问令牌
  static generateAccessToken(payload: JwtPayload): string {
    return jwt.sign(payload, config.auth.jwtSecret, {
      expiresIn: config.auth.accessTokenExpirySeconds,
    });
  }

  // 生成刷新令牌
  static generateRefreshToken(payload: JwtPayload): string {
    return jwt.sign(payload, config.auth.jwtSecret, {
      expiresIn: config.auth.accessTokenExpirySeconds
    });
  }

  // 验证密码
  static async verifyPassword(plainPassword: string, hashedPassword: string): Promise<boolean> {
    return bcrypt.compare(plainPassword, hashedPassword);
  }

  // 哈希密码
  static async hashPassword(password: string): Promise<string> {
    return bcrypt.hash(password, saltRounds);
  }

  // 用户登录
  static async login(phone: string, password: string): Promise<TokenResponse> {
    const user = await getUserByPhone(phone);
    if (!user) {
      throw new Error('用户不存在');
    }

    const isValid = await AuthService.verifyPassword(password, user.password);
    if (!isValid) {
      throw new Error('密码错误');
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
  }

  // 用户注册
  static async register(data: RegisterDTO): Promise<TokenResponse> {
    const existingUser = await getUserByPhone(data.phone);
    if (existingUser) {
      throw new Error('手机号已被注册');
    }

    const hashedPassword = await AuthService.hashPassword(data.password);
    console.log(hashedPassword)
    const user = await createUser({
      ...data,
      password: hashedPassword,
      role: data.role || 'user'
    });

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
  }

  // 刷新访问令牌
  static async refreshToken(refreshToken: string): Promise<TokenResponse> {
    try {
      const decoded = jwt.verify(refreshToken, config.auth.jwtSecret) as JwtPayload;
      
      const user = await getUserByPhone(decoded.phone);
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
    } catch (error) {
      throw new Error('无效的刷新令牌');
    }
  }

  // 验证 JWT 令牌
  static verifyToken(token: string): JwtPayload {
    return jwt.verify(token, config.auth.jwtSecret) as JwtPayload;
  }
}