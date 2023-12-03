/** @format */

const Review = require("../../model/Review");
const findOne = require("./findOne");
const deleteOne = async (id) => {
  const review = await findOne(id);

  return Review.findByIdAndDelete(review?._id);
};

module.exports = deleteOne;
