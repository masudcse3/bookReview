/** @format */

const User = require("../../model/User");
const { badRequest, alreadyExists } = require("../../utils/error");
const { creatHash } = require("../../utils/hashing");
const { findUserByEmail, emptyUser } = require("./utils");

const create = async ({
  name,
  email,
  password,
  role = "user",
  status = "pending",
}) => {
  if (!name || !email || !password || !role || !status)
    throw badRequest("invalid parameters");
  const getUser = await findUserByEmail(email);

  if (getUser) {
    throw alreadyExists("User already exists");
  }
  const isAdmin = await emptyUser();
  if (isAdmin) {
    role = "admin";
    status = "approved";
  }
  password = await creatHash(password);
  const user = await User({ name, email, password, role, status });
  await user.save();
  return { ...user._doc, id: user._id };
};
module.exports = create;
