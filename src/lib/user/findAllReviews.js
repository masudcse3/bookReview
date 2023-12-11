/** @format */

const defaults = require("../../config/defaults");
const Review = require("../../model/Review");
const { findOne: findABook } = require("../../lib/book");
const checkObjectId = require("../../utils/checkObjectId");
const { badRequest } = require("../../utils/error");
const findAllReviews = async ({
  id,
  page = defaults.page,
  limit = defaults.limit,
  sortType = defaults.sortType,
  sortBy = defaults.sortBy,
  status = "published",
}) => {
  if (!checkObjectId(id)) {
    throw badRequest("Invalid Id");
  }
  const filter = {
    author: id,
    status: status,
  };
  const sortStr = `${sortType === "desc" ? "-" : ""}${sortBy}`;
  const reviews = await Review.find(filter)
    .populate({ path: "book", select: "_id title" })
    .select("_id ratting comment status book")
    .sort(sortStr)
    .skip(limit * page - limit)
    .limit(limit);
  return reviews.map((review) => {
    return {
      ...review._doc,
    };
  });
};
module.exports = findAllReviews;
