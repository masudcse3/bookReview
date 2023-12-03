/** @format */

const { createLogger, format } = require("winston");
const { combine, timestamp, json } = format;
const {
  infoTransport,
  errTransport,
  logTransport,
  elasticTransport,
} = require("./transports");

// logger function
const infologger = createLogger({
  transports: [infoTransport, elasticTransport],
  format: combine(timestamp(), json()),
});
const errorlogger = createLogger({
  transports: [errTransport, elasticTransport],
  format: combine(timestamp(), json()),
});

const terminallogger = createLogger({
  transports: [logTransport],
  format: combine(timestamp(), json()),
});

module.exports = {
  infologger,
  errorlogger,
  terminallogger,
};
