/** @format */
const User = require("../../model/User");
const {
  badRequest,
  notFound,
  alreadyExists,
  serverError,
} = require("../../utils/error");
const defaults = require("../../config/defaults");

const findAll = async ({
  page = defaults.page,
  limit = defaults.limit,
  sortBy = defaults.sortBy,
  sortType = defaults.sortType,
  status = "",
  name = "",
  email = "",
  role = "user",
}) => {
  const filter = {
    name: { $regex: name, $options: "i" },
    email: { $regex: email, $options: "i" },
    role: { $regex: role, $options: "i" },
    status: { $regex: status, $options: "i" },
  };
  const sortStr = `${sortType === "desc" ? "-" : ""}${sortBy}`;
  const users = await User.find(filter)
    .sort(sortStr)
    .skip(page * limit - limit)
    .limit(limit);
  return users.map((user) => {
    return {
      id: user.id,
      name: user.name,
      email: user.email,
    };
  });
};

module.exports = findAll;
