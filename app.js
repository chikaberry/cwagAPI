//using express
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./swagger.json");
const express = require("express");
const app = express();
const port = process.env.PORT || 3000;
const mongodb = require("./db/connect");
const bodyParser = require("body-parser");

app
  .use("/", require("./routes"))
  .use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument))
  .use(bodyParser.json())

mongodb.initDb((err) => {
  if (err) {
    console.log(err);
  } else {
    app.listen(port);
    console.log(`Connected to DB and listening on ${port}`);
  }
});
