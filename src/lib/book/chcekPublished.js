/** @format */

const Book = require("../../model/Book");

const checkPublished = async () => {
  const book = await Book.find({ published: "published" });
  if (book) {
    return true;
  }
  return false;
};

module.exports = checkPublished;
