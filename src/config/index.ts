import dotenv from 'dotenv';

dotenv.config();

interface Config {
  port: number;
  db: {
    host?: string;
    port?: number;
    username?: string;
    password?: string;
    database?: string;
  },
}

const config: Config = {
  port: Number(process.env.PORT),
  db: {
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
  }
}

export default config