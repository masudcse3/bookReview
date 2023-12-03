/** @format */

const { genTransport } = require("./utils/genTransports");
const { transports, format } = require("winston");
const { combine, timestamp, json } = format;
const { ElasticsearchTransport } = require("winston-elasticsearch");

const elasticTransport = new ElasticsearchTransport({
  level: "info",
  indexPrefix: "express-log",
  indexSuffixPattern: "DD-MM-YYYY",
  clientOpts: {
    node: "http://localhost:9200",
  },
});

const infoTransport = genTransport("./log/info/%DATE%.log", "info");
const errTransport = genTransport("./log/error/%DATE%.log", "error");

const logTransport = new transports.Console({
  level: "http",
  format: combine(timestamp(), json()),
});

module.exports = {
  infoTransport,
  errTransport,
  logTransport,
  elasticTransport,
};
