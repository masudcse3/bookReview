/** @format */

const createBook = require("./create");
const findById = require("./findOne");
const updateBook = require("./update");
const findAll = require("./findAll");
const deleteBook = require("./delete");

module.exports = {
  createBook,
  findById,
  findAll,
  updateBook,
  deleteBook,
};
