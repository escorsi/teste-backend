import swaggerJSDoc from 'swagger-jsdoc';

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'My API',
      version: '1.0.0',
      description: 'API documentation',
    },
    servers: [
      {
        url: 'http://localhost:4568/api',
        description: 'Development server',
      },
    ],
  },
  apis: ['./src/interfaces/http/presentation/*.ts'],
};

const swaggerSpec = swaggerJSDoc(options);

export default swaggerSpec;
