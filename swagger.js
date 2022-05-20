const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: 'My API',
    description: 'Contacts Project',
  },
 //test for localhost host: 'localhost:3000',
  host: 'localhost:3000',
  schemes: ['http', 'https'],
};

const outputFile = './swagger.json';
const endpointsFiles = ['./app.js'];

/* NOTE: if you use the express Router, you must pass in the 
   'endpointsFiles' only the root file where the route starts,
   such as index.js, app.js, routes.js, ... */

swaggerAutogen(outputFile, endpointsFiles, doc);

//
