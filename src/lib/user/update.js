/** @format */
const User = require("../../model/User");
const { badRequest, notFound } = require("../../utils/error");

const { creatHash } = require("../../utils/hashing");
const checkObjectId = require("../../utils/checkObjectId");

const updateOne = async ({ id, name, email, password, role, status }) => {
  if (!checkObjectId(id)) {
    throw badRequest("Your id param is incorrect");
  }
  const user = await User.findById(id);

  if (!user) {
    throw notFound("No user found with this id");
  }

  if (password !== user.password) {
    password = await creatHash(password);
  }
  const payload = {
    name,
    email,
    password,
    role,
    status,
  };
  user.overwrite(payload);
  await user.save();
  return payload;
};
module.exports = updateOne;
