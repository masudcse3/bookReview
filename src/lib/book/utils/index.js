/** @format */

const Book = require("../../../model/Book");
const { notFound } = require("../../../utils/error");
const count = ({ title = " ", publication = " ", writter = "" }) => {
  const filter = {
    title: { $regex: title, $options: "i" },
    publication: { $regex: publication, $options: "i" },
    writter: { $regex: writter, $options: "i" },
    status: "published",
  };
  return Book.count(filter);
};

const findBookById = async (id) => {
  return await Book.findById(id);
};

module.exports = {
  count,
  findBookById,
};
