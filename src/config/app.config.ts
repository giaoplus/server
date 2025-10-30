import dotenv from 'dotenv';
dotenv.config();

export const appConfig = {
  env: process.env.NODE_ENV,
  port: Number(process.env.PORT),
}
