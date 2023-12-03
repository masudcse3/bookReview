/** @format */

const { decodeToken, verifyToken } = require("../../lib/token");
const { findUserByEmail } = require("../../lib/user/utils");
const { unAuthorized } = require("../../utils/error");

const authentication = async (req, _res, next) => {
  const token = req.headers.authorization.split(" ")[1];

  try {
    const decoded = verifyToken({ token });
    const user = await findUserByEmail(decoded.email);
    if (!user) {
      next(unAuthorized("Your token is not correct"));
    }
    if (user.status !== "approved") {
      next(unAuthorized(`Your account is ${user.status}`));
    }

    req.user = { id: user.id, ...user._doc };
    next();
  } catch (err) {
    next(unAuthorized());
  }
};

module.exports = authentication;
