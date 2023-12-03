/** @format */
const User = require("../../model/User");
const { badRequest, notFound } = require("../../utils/error");

const checkObjectId = require("../../utils/checkObjectId");

const findOne = async (id) => {
  if (!checkObjectId(id)) {
    throw badRequest("Your id param is incorrect");
  }
  try {
    const user = await User.findById(id);
    if (!user) {
      throw notFound("No user found with this id");
    }
    const payload = {
      id: user.id,
      ...user._doc,
    };
    return payload;
  } catch (err) {
    console.log("[User Find By ID]", err);
    throw badRequest("No user found");
  }
};
module.exports = findOne;
