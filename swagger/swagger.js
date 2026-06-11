const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: 'Portfolio Builder API',
    description: 'API documentation for the Portfolio Builder project'
  },
  host: 'localhost:5000',
  schemes: ['http']
};

const outputFile = './swagger/swagger-output.json';
const routes = ['./server.js'];

swaggerAutogen(outputFile, routes, doc);