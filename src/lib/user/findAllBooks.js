/** @format */
const Book = require("../../model/Book");
const defaults = require("../../config/defaults");
const checkObjectId = require("../../utils/checkObjectId");
const { badRequest } = require("../../utils/error");
const findAllBooks = async ({
  id,
  page = defaults.page,
  limit = defaults.limit,
  sortBy = defaults.sortBy,
  sortType = defaults.sortType,
  status = "published",
}) => {
  if (!checkObjectId(id)) {
    throw badRequest("User id is incorrect format");
  }
  const sortStr = `${sortType === "desc" ? "-" : ""}${sortBy}`;
  const filter = {
    author: id,
    status: status,
  };
  const books = await Book.find(filter)
    .select("_id title writter cover price status")
    .sort(sortStr)
    .skip(page * limit - limit)
    .limit(limit);

  return books.map((book) => {
    return {
      ...book._doc,
    };
  });
};

module.exports = findAllBooks;
