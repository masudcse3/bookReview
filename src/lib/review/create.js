/** @format */

const Review = require("../../model/Review");
const { badRequest } = require("../../utils/error");
const create = async ({
  ratting = 0,
  comment = "",
  status = "published",
  author,
  book,
}) => {
  if (ratting < 1 || ratting > 5) {
    throw badRequest("ratting must be between 0-5");
  }
  const review = new Review({ ratting, comment, status, author, book });
  await review.save();
  return {
    id: review._id,
    ...review._doc,
  };
};

module.exports = create;
