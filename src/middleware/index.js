/** @format */

const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const YAML = require("yamljs");
const swaggerUI = require("swagger-ui-express");
const openAPIValidator = require("express-openapi-validator");
const setCorrelationId = require("./logger/utils/setCorrelationId");

const swaggerDoc = YAML.load("./swagger.yaml");
const applyMiddlewares = (app) => {
  app.use(express.json());
  app.use(morgan("dev"));
  app.use(setCorrelationId);
  app.use(cors());
  app.use("/docs", swaggerUI.serve, swaggerUI.setup(swaggerDoc));
  app.use(
    openAPIValidator.middleware({
      apiSpec: "./swagger.yaml",
    })
  );
};
module.exports = applyMiddlewares;
