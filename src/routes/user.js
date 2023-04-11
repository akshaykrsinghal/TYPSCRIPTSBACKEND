const express = require("express");
const router = express.Router();
const userController = require("../controllers/users");

let routes = (app) => {

  router.post("/userValidate", userController.userValidate);

  return app.use("/", router);
};

module.exports = routes;
