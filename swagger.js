const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: 'My API',
    description: 'Cwag Project',
  },
 //test for localhost host: 'localhost:3000', 'cwagapi.herokuapp.com'
  host: 'cwagapi.herokuapp.com',
  schemes: ['http', 'https'],
};

const outputFile = './swagger-autogen.json';
const endpointsFiles = ['./app.js'];

/* NOTE: if you use the express Router, you must pass in the 
   'endpointsFiles' only the root file where the route starts,
   such as index.js, app.js, routes.js, ... */

swaggerAutogen(outputFile, endpointsFiles, doc);

//
