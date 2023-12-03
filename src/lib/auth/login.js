/** @format */

const { unAuthorized, badRequest } = require("../../utils/error");
const { checkHash } = require("../../utils/hashing");
const { generateToken } = require("../token");
const { findUserByEmail } = require("../user/utils");
const loginService = async ({ email, password }) => {
  // step 1. check user is exist or not
  // step 2. match the password
  // step 3. genarte a success/error message if everything correct or not

  if (!email || !password) throw badRequest("email and password is required");

  const user = await findUserByEmail(email);
  if (!user) {
    throw unAuthorized("your email is not found.");
  }
  if (user.status !== "approved") {
    throw unAuthorized(`Your account status is ${user.status}`);
  }

  const verifyPass = await checkHash(password, user.password);
  if (!verifyPass) {
    throw unAuthorized("Wrong password");
  }
  const payload = {
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role,
  };
  return generateToken({ payload });
};

module.exports = loginService;
