/** @format */

const Review = require("../../model/Review");
const { badRequest } = require("../../utils/error");
const findOne = require("./findOne");

const updateOne = async ({ id, ratting, comment, status }) => {
  const review = await findOne(id);
  const payload = {
    ratting: ratting || review.ratting,
    comment: comment || review.comment,
    status: status || review.status,
  };
  const result = await Review.findByIdAndUpdate(id, payload, { new: true });
  await result.save();
  return result;
};

module.exports = updateOne;
