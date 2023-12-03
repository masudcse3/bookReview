/** @format */

const create = require("./create");
const findOne = require("./findOne");
const findForBook = require("./findForBook");
const findAll = require("./findAll");
const deleteOne = require("./delete");
const updateOne = require("./update");

module.exports = {
  create,
  findOne,
  findAll,
  findForBook,
  deleteOne,
  updateOne,
};
