/** @format */

const checkPublished = require("../../lib/book/chcekPublished");
const bookOwnership = require("../../lib/book/bookOwnership");

const getPublishData = ({ roles = ["admin"], model = "" }) => {
  return async (req, res, next) => {
    const role = req.user.role;
    const userId = req.user.id;

    if (roles.includes(role)) {
    }

    if ((model = "Book")) {
      const result = await checkPublished();
      if (result) {
        return next();
      }
      return false;
    }
  };
};

module.exports = getPublishData;
