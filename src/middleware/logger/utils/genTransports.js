/** @format */

const { transports } = require("winston");
require("winston-daily-rotate-file");

const genTransport = (filename, level) => {
  return new transports.DailyRotateFile({
    filename: filename || ".log/error/%DATE%.log",
    level: level || "info",
    zippedArchive: true,
    maxSize: "2m",
    maxFiles: "14d",
    datePattern: "DD-MM-YYYY",
  });
};
module.exports = {
  genTransport,
};
