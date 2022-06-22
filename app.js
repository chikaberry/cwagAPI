//using express
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./swagger.json");
const swaggerDocument_auto = require("./swagger-autogen.json");
const express = require("express");
const app = express();
const port = process.env.PORT || 3000;
const mongodb = require("./db/connect");
const bodyParser = require("body-parser");
const { auth } = require("express-openid-connect");
const { requiresAuth } = require('express-openid-connect');


//stuff for Oauth
require('dotenv').config();
const config = {
  authRequired: false,
  auth0Logout: true,
  secret: process.env.SECRET,
  baseURL: process.env.BASEURL,
  clientID: process.env.CLIENTID,
  issuerBaseURL:"https://dev-9e9ir9qy.us.auth0.com"
  //process.env.ISSUERBASEURL
  
};

// auth router attaches /login, /logout, and /callback routes to the baseURL

//code reads form up to doen, hits the route first and then the body parser. Didnt know how to parser the body json. make
//sure body parser is first and then teh routes
app
  .use(bodyParser.json())
  .use("/", require("./routes"))
  .use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument))
  //.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument_auto))
  .use(auth(config))
  // req.isAuthenticated is provided from the auth router
  .get("/", (req, res) => {
    res.send(req.oidc.isAuthenticated() ? "Logged in" : "Logged out");
  })
  .get('/profile', requiresAuth(), (req, res) => {
    res.send(JSON.stringify(req.oidc.user));
  });

mongodb.initDb((err) => {
  if (err) {
    console.log(err);
  } else {
    app.listen(port);
    console.log(`Connected to DB and listening on ${port}`);
  }
});
