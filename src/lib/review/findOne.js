/** @format */

const Review = require("../../model/Review");
const checkObjectId = require("../../utils/checkObjectId");
const { badRequest, notFound } = require("../../utils/error");

const findOne = async (id) => {
  const idCheck = checkObjectId(id);
  if (!idCheck) {
    throw badRequest("Your id param is not correct");
  }
  const review = await Review.findById(id)
    .populate({ path: "book", select: "title" })
    .populate({ path: "author", select: "name" });
  if (!review) {
    throw notFound("No review found");
  }
  return review._doc;
};

module.exports = findOne;
