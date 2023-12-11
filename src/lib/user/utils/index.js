/**
 * find a user from the Database with the given email address and return a boolean value
 *
 * @format
 * @param {string} email
 * @returns {boolean}
 */
const Book = require("../../../model/Book");
const User = require("../../../model/User");
const Review = require("../../../model/Review");

const findUserByEmail = async (email) => {
  try {
    const user = await User.findOne({ email });
    return user ? user : false;
  } catch (error) {
    return error;
  }
};

const findUserById = async (id) => {
  try {
    const user = await User.findById(id);
    return user ? user : false;
  } catch (error) {
    return error;
  }
};

/**
 * check the first user.
 * @returns {boolean}
 */
const emptyUser = async () => {
  const users = await User.find();
  return users.length < 1 ? true : false;
};
const count = ({ role = "", status = "", name = "", email = "" }) => {
  const filter = {
    name: { $regex: name, $options: "i" },
    email: { $regex: email, $options: "i" },
    role: { $regex: role, $options: "i" },
    status: { $regex: status, $options: "i" },
  };
  return User.count(filter);
};

const totalBookCount = ({ id, status }) => {
  const filter = {
    author: id,
    status: status,
  };
  return Book.count(filter);
};
const totalReviewCount = ({ id, status }) => {
  const filter = {
    author: id,
    status: status,
  };
  return Review.count(filter);
};

module.exports = {
  findUserByEmail,
  findUserById,
  emptyUser,
  count,
  totalBookCount,
  totalReviewCount,
};
