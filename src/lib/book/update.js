/** @format */

const Book = require("../../model/Book");
const { findOne } = require("../../lib/user");
const checkObjectId = require("../../utils/checkObjectId");
const { badRequest, notFound } = require("../../utils/error");

const updateOne = async ({
  id,
  title,
  writter,
  price,
  cover,
  publication,
  status,
}) => {
  if (!checkObjectId(id)) {
    throw badRequest("Your id param is incorrect");
  }
  const book = await Book.findById(id);
  if (!book) {
    throw notFound("No Book found");
  }
  const payload = {
    title: title || book.title,
    writter: writter || book.writter,
    price: price || book.price,
    cover: cover || book.cover,
    publication: publication || book.publication,
    status: status || book.status,
  };

  const data = await Book.findByIdAndUpdate(id, payload, { new: true });

  return {
    ...data._doc,
  };
};

module.exports = updateOne;
