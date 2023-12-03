/** @format */

const notFound = (msg = "Resource not found") => {
  const error = new Error(msg);
  error.status = 404;
  return error;
};
const badRequest = (msg = "bad request") => {
  const error = new Error(msg);
  error.status = 400;
  return error;
};
const unAuthorized = (msg = "unauthorized") => {
  const error = new Error(msg);
  error.status = 401;
  return error;
};
const alreadyExists = (msg = "Already exists") => {
  const error = new Error(msg);
  error.status = 403;
  return error;
};

const serverError = (msg = "Something went wrong in the server") => {
  const error = new Error(msg);
  error.status = 500;
  return error;
};

module.exports = {
  notFound,
  badRequest,
  unAuthorized,
  serverError,
  alreadyExists,
};
