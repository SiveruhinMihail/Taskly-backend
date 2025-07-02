const swaggerJsdoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API Documentation',
      version: '1.0.0',
      description: 'Документация для вашего API',
    },
    servers: [
      {
        url: 'http://localhost:3000', // Укажите ваш URL
        description: 'Development server',
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
    },
    security: [{ bearerAuth: [] }],
  },
  apis: ['./routes/*.js', './controllers/*.js'], // Пути к файлам с JSDoc-комментариями
};

const specs = swaggerJsdoc(options);

module.exports = specs;