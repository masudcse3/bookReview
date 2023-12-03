/** @format */

const Book = require("../../model/Book");
const { notFound, unAuthorized } = require("../../utils/error");
const bookOwnership = async ({ resourceId, userId }) => {
  try {
    const book = await Book.findById(resourceId);
    if (!book) {
      throw notFound("I don't find any book");
    }
    if (book?.author?._id.toString() !== userId) {
      throw unAuthorized("You are not allowed.");
    }
    return true;
  } catch (err) {
    console.log(err);
  }
};

module.exports = bookOwnership;
