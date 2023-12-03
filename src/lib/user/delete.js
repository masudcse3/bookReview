/** @format */
const User = require("../../model/User");
const { badRequest, notFound, serverError } = require("../../utils/error");

const checkObjectId = require("../../utils/checkObjectId");

const deleteOne = async (id) => {
  if (!checkObjectId(id)) {
    throw badRequest("Your id param is incorrect");
  }
  try {
    const user = await User.findById(id);
    if (!user) {
      throw notFound("No user found with this id");
    }
    await user.deleteOne({ email: user.email });
    return;
  } catch (err) {
    console.log("[Delete User]", err);
    throw serverError();
  }
};
module.exports = deleteOne;
