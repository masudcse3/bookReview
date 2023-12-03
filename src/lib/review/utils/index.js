/** @format */

const Review = require("../../../model/Review");

const count = (filter) => {
  return Review.find(filter).count();
};
module.exports = { count };
