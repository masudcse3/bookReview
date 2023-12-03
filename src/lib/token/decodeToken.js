/** @format */

const jwt = require("jsonwebtoken");
const { serverError } = require("../../utils/error");
const decodeToken = ({ token, algorithm = "HS256" }) => {
  try {
    return jwt.decode(token, { algorithms: [algorithm] });
  } catch (err) {
    console.log("JWT", err);
    throw serverError();
  }
};
module.exports = decodeToken;
