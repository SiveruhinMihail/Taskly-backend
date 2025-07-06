const swaggerJSDoc = require('swagger-jsdoc')
const authSwagger = require('./auth.swagger')

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API Документация',
      version: '1.0.0',
      description: 'Документация для API системы',
    },
    servers: [
      {
        url: 'http://localhost:3000/docs',
        description: 'Локальный сервер',
      },
    ],
    components: {
      securitySchemes: {
        BearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
      ...authSwagger.components,
    },
    paths: {
      ...authSwagger.paths,
    },
  },
  apis: ['./routes/*.js'],
}

const swaggerSpec = swaggerJSDoc(options)

module.exports = swaggerSpec
