// JWT令牌载荷
export interface JwtPayload {
  userId: string;
  phone: string;
  role: string;
  iat?: number;
  exp?: number;
}

// 登录请求 DTO
export interface LoginDTO {
  phone: string;
  password: string;
}

// 注册请求 DTO
export interface RegisterDTO {
  name: string;
  phone: string;
  email: string;
  password: string;
  role?: string;
}

// 令牌响应
export interface TokenResponse {
  accessToken: string;
  refreshToken: string;
  expiresIn: number;
}

// 用户角色类型
export type UserRole = 'user' | 'admin' | 'editor';
