const serverless = require("serverless-http");
const express = require("express");
const app = express();
const cors = require('cors');
const { Routes } = require("./src/routes/index.routes");
const {UserController} = require("./src/controllers/user.controllers")
app.use(cors(
  {
    origin: ["https://demo700.web.app","http://localhost:3000"]
  }
))


app.use('/api', Routes)


app.get("/", (req, res, next) => {
  return res.status(200).json({
    message: "Hello from root!",
  });
});

app.get("/path", (req, res, next) => {
  return res.status(200).json({
    message: "Hello from path!",
  });
});

app.get("/products", (req, res, next) => {
  return res.status(200).json({
    message: "Hello from products!",
  });
});

/*app.get("/users", (req, res, next) => {
  return res.status(200).json({
    message: "Hello from users*!",
  });
});*/

app.use((req, res, next) => {
  return res.status(404).json({
    error: "Not Found",
  });
});

module.exports.handler = serverless(app);
module.exports.controllers = { UserController };

const getUsers = (event, context, callback) => {
  return { "msg": "get users func" }
}


module.exports.getUsers = getUsers;
