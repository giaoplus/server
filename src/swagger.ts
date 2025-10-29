import fs from "fs";
import path from 'path';
import Application from 'koa'
import swaggerJSDoc from 'swagger-jsdoc'
import { koaSwagger } from 'koa2-swagger-ui'
import Router from "koa-router"

const router = new Router({ prefix: '/swagger' })
const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API Documentation',
      version: '1.0.0',
      description: 'API documentation for your project',
    },
    servers: [
      {
        url: 'http://localhost:{port}',
        variables: {
          port: {
            default: '3000'
          }
        }
      }
    ],
    components: {
      securitySchemes: {
        BearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        }
      }
    },
    security: [
      {
        BearerAuth: []
      }
    ]
  },
  apis: [path.join(__dirname, './modules/**/*.route.ts')],
}
const swaggerSpec = swaggerJSDoc(options)
fs.writeFileSync('./swagger.json', JSON.stringify(swaggerSpec))

router.get('/json', (ctx) => {
  ctx.body = swaggerSpec
})


export const swaggerRouter = (app: Application) => {
  app.use(router.routes())
  app.use(router.allowedMethods())
  app.use(
    koaSwagger({
      routePrefix: '/swagger/index.html',
      swaggerOptions: {
        url: '/swagger/json',
        dom_id: '#swagger-ui',
        layout: 'StandaloneLayout',
        deepLinking: true,
      },
    })
  )
}