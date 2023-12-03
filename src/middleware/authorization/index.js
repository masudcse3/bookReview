/** @format */

// get the access token and decode it

const { unAuthorized, serverError } = require("../../utils/error");

// verify the role
const authorize = (roles = ["admin"]) => {
  return (req, res, next) => {
    try {
      const user = req.user;

      const hasAccess = roles.some((role) => role === user.role);
      if (!hasAccess) {
        next(unAuthorized("You don't have permision"));
      }
      next();
    } catch (err) {
      console.log("Authorization", err);
      next(serverError());
    }
  };
};

module.exports = authorize;
