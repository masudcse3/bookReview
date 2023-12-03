/** @format */

const jwt = require("jsonwebtoken");
const { serverError } = require("../../utils/error");
const verifyToken = ({ token, secret = process.env.TOKEN_SECRET_KEY }) => {
  try {
    return jwt.verify(token, secret);
  } catch (err) {
    console.log("JWT", err);
    throw serverError();
  }
};
module.exports = verifyToken;
