/** @format */

const bookOwnership = require("../../lib/book/bookOwnership");
const reviewOwnership = require("../../lib/review/reviewOwnership");
const { unAuthorized } = require("../../utils/error");

const ownership = (model = "") => {
  return async (req, res, next) => {
    const { id: userId, role } = req.user;
    const resourceId = req.params.id;
    if (model === "Book") {
      if (role === "admin") {
        return next();
      }
      const result = await bookOwnership({ resourceId, userId });
      if (!result) {
        return next(unAuthorized("You are not allowed"));
      }
      return next();
    }

    if ((model = "Review")) {
      if (role === "admin") {
        return next();
      }
      const result = await reviewOwnership({ resourceId, userId });
      if (!result) {
        return next(unAuthorized("You are not allowed"));
      }
      return next();
    }
  };
};

module.exports = ownership;
