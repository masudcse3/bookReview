/** @format */

const Book = require("../../model/Book");
const Review = require("../../model/Review");
const checkObjectId = require("../../utils/checkObjectId");
const { badRequest, notFound } = require("../../utils/error");
const { findBookById } = require("./utils");

const deleteService = async (id) => {
  const validId = checkObjectId(id);
  if (!validId) {
    throw badRequest("Your id param is incorrect");
  }
  const book = await Book.findById(id);
  if (!book) {
    throw notFound("No book found to delete");
  }
  await Review.deleteMany({ book: book._id });
  await Book.deleteOne({ _id: book?._id.toString() });
  return true;
};

module.exports = deleteService;
