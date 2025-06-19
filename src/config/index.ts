import { appConfig } from './app.config'
import { dbConfig } from './db.config'
import { authConfig } from './auth.config'

export default {
  app: appConfig,
  db: dbConfig,
  auth: authConfig
};

export * from './app.config'
export * from './db.config'
export * from './auth.config'