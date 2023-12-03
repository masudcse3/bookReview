/** @format */

// make the actual express winston middlewares and exports them

const expressWinstone = require("express-winston");
const { infologger, errorlogger, terminallogger } = require("./logger");

const infoLogger = expressWinstone.logger({
  winstonInstance: infologger,
  meta: true,
  expressFormat: true,
  colorize: false,
});
const terminalLogger = expressWinstone.logger({
  winstonInstance: terminallogger,
  meta: false,
  expressFormat: true,
  colorize: false,
  msg: "HTTP {{req.method}} {{req.url}} {{res.statusCode}}  {{res.responseTime}}ms",
});

const errorLogger = expressWinstone.errorLogger({
  winstonInstance: errorlogger,
  meta: true,
  expressFormat: true,
  colorize: false,
  msg: "{correlationID: {{req.headers['x-correlation-id']}} error: {{err.message}}}",
});

module.exports = {
  infoLogger,
  terminalLogger,
  errorLogger,
};
