import dotenv from 'dotenv';
dotenv.config();

// 认证配置
export const authConfig = {
  jwtSecret: process.env.SECRET_KEY || 'your-strong-secret-key-here',
  accessTokenExpiry: '15m', // 访问令牌有效期
  refreshTokenExpiry: '7d', // 刷新令牌有效期
  accessTokenExpirySeconds: 2 * 60 * 60, // 两小时（秒数）
  
  // 安全设置
  passwordMinLength: 8,
  passwordRequirements: {
    minLength: 8,
    requireUppercase: true,
    requireLowercase: true,
    requireNumber: true,
    requireSpecialChar: true
  }
};