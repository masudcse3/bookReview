/** @format */

const Review = require("../../model/Review");
const { badRequest, notFound } = require("../../utils/error");
const checkObjectId = require("../../utils/checkObjectId");
const defaults = require("../../config/defaults");
const findForBook = async ({
  id,
  page = defaults.page,
  limit = defaults.limit,
  sortType = defaults.sortType,
  sortBy = defaults.sortBy,
}) => {
  const idCheck = checkObjectId(id);
  if (!idCheck) {
    throw badRequest("Your id param is incorrect");
  }
  const sortStr = `${sortType === "desc" ? "-" : ""}${sortBy}`;
  const reviews = await Review.find({ book: id })
    .populate({ path: "author", select: "name" })
    .populate({ path: "book", select: "title" })
    .sort(sortStr)
    .skip(page * limit - limit)
    .limit(limit);
  if (reviews.length === 0) {
    throw notFound("No Reviews found");
  }

  const allReviews = reviews.map((review) => {
    return {
      id: review._id,
      ratting: review.ratting,
      comment: review.comment,
      author: review.author,
    };
  });
  return {
    book: reviews[0]?.book?.title,
    reviews: allReviews,
  };
};

module.exports = findForBook;
