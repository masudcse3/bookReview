/** @format */

const createUser = require("./create");
const getAllUsers = require("./findAll");
const updateUser = require("./update");
const deleteUser = require("./delete");
const findById = require("./findById");
module.exports = { createUser, getAllUsers, updateUser, deleteUser, findById };
