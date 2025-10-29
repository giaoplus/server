// 用户详情 DTO
export interface User {
  id: string;
  name: string;
  phone: string;
  email: string;
  password: string;
  role: string;
  createdAt: Date;
}

// 添加用户 DTO
export interface CreateUserDTO {
  name: string;
  phone: string;
  email: string;
  password: string;
  role: string;
}
