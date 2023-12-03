/** @format */

const Book = require("../../model/Book");
const { badRequest } = require("../../utils/error");

const createBook = async ({
  title,
  writter,
  price,
  publication,
  cover = "",
  status = "draft",
  author,
}) => {
  if (!title || !writter || !price || !publication)
    throw badRequest("Invalid parameters");

  const book = await Book({
    title,
    writter,
    price,
    cover,
    publication,
    status,
    author,
  });

  return await book.save();
};

module.exports = createBook;
