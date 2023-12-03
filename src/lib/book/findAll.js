/** @format */

const Book = require("../../model/Book");
const defaults = require("../../config/defaults");
const { notFound } = require("../../utils/error");

const findAll = async ({
  page = defaults.page,
  limit = defaults.limit,
  sortBy = defaults.sortBy,
  sortType = defaults.sortType,
  title = "",
  writter = "",
  publication = "",
}) => {
  const filter = {
    title: { $regex: title, $options: "i" },
    publication: { $regex: publication, $options: "i" },
    writter: { $regex: writter, $options: "i" },
    status: "published",
  };
  const sortStr = `${sortType === "desc" ? "-" : ""}${sortBy}`;

  const books = await Book.find(filter)
    .populate({ path: "author", select: "name" })
    .sort(sortStr)
    .skip(page * limit - limit)
    .limit(limit);
  if (books.length === 0) {
    throw notFound("No books found");
  }
  return books.map((book) => {
    return {
      ...book._doc,
    };
  });
};

module.exports = findAll;
