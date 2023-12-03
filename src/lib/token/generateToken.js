/** @format */

const jwt = require("jsonwebtoken");
const { serverError } = require("../../utils/error");
const genarteToken = ({
  payload,
  secrate = process.env.TOKEN_SECRET_KEY,
  algorithm = "HS256",
  expiresIn = "1h",
}) => {
  try {
    const token = jwt.sign(payload, secrate, { algorithm, expiresIn });
    return token;
  } catch (error) {
    console.log("JWT", error);
    throw serverError();
  }
};

module.exports = genarteToken;
