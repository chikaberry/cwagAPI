//using express
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./swagger.json");
const express = require("express");
const app = express();
const port = process.env.PORT || 3000;
const mongodb = require("./db/connect");
const bodyParser = require("body-parser");


//code reads form up to doen, hits the route first and then the body parser. Didnt know how to parser the body json. make 
//sure body parser is first and then teh routes
app
  .use(bodyParser.json())
  .use("/", require("./routes"))
  .use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument))
  
mongodb.initDb((err) => {
  if (err) {
    console.log(err);
  } else {
    app.listen(port);
    console.log(`Connected to DB and listening on ${port}`);
  }
});
