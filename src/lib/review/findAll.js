/** @format */
const Review = require("../../model/Review");
const defaults = require("../../config/defaults");
const { notFound } = require("../../utils/error");
const findAll = async ({
  page = defaults.page,
  limit = defaults.limit,
  sortBy = defaults.sortBy,
  sortType = defaults.sortType,
}) => {
  const sortStr = `${sortType === "desc" ? "-" : ""}${sortBy}`;
  const reviews = await Review.find({ status: "published" })
    .populate({ path: "book", select: "title" })
    .populate({ path: "author", select: "name" })
    .sort(sortStr)
    .skip(limit * page - limit)
    .limit(limit);
  if (reviews.length === 0) {
    throw notFound("No reviews found");
  }
  return reviews.map((review) => review._doc);
};

module.exports = findAll;
