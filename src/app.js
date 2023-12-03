/** @format */

const express = require("express");
const applyMiddlewares = require("./middleware");
const router = require("./routes");
const { infoLogger, errorLogger } = require("./middleware/logger");

const app = express();
applyMiddlewares(app);
app.use(infoLogger);
// app.use(terminalLogger);
app.use("/api/v1", router);

app.get("/api/v1/health", (req, res) => {
  console.log(req.headers);
  res.status(200).json({ message: "I am okay" });
});
app.use(errorLogger);
app.use((err, _req, res, _next) => {
  console.log(err);
  res.status(err.status || 500).json({
    code: err.status,
    message: err.message,
    error: err.errors,
  });
});

module.exports = app;
