/** @format */

const Review = require("../../model/Review");
const { notFound, unAuthorized } = require("../../utils/error");
const reviewOwnership = async ({ resourceId, userId }) => {
  try {
    const review = await Review.findById(resourceId);
    if (!review) {
      throw notFound("I don't find any review");
    }
    if (review?.author?._id.toString() !== userId) {
      throw unAuthorized("You are not allowed.");
    }
    return true;
  } catch (err) {
    console.log(err);
  }
};

module.exports = reviewOwnership;
