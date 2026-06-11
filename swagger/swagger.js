const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: 'Portfolio Builder API',
    description: 'API documentation for the Portfolio Builder project'
  },
  host: 'portfolio-api-slrv.onrender.com',
  schemes: ['https'],
  tags: [
    { name: 'Users', description: 'User endpoints' },
    { name: 'Skills', description: 'Skills endpoints' }
  ]
};

const outputFile = './swagger/swagger-output.json';
const routes = ['./server.js'];

swaggerAutogen(outputFile, routes, doc);