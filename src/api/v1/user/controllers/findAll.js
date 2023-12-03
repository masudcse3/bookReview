/** @format */
const { findAll } = require("../../../../lib/user");
const { count } = require("../../../../lib/user/utils");
const defaults = require("../../../../config/defaults");
const { serverError } = require("../../../../utils/error");
const getPagination = require("../../../../utils/pagination");
const heatoasLinks = require("../../../../utils/links");

const getAllUsers = async (req, res, next) => {
  const total = req.query.total || defaults.total;
  const page = req.query.page || defaults.page;
  const limit = req.query.limit || defaults.limit;
  const sortBy = req.query.sortBy || defaults.sortBy;
  const sortType = req.query.sortType || defaults.sortType;
  const name = req.query.name || "";
  const email = req.query.email || "";
  const role = req.query.role || "";
  const status = req.query.status || "";

  try {
    const users = await findAll({
      total,
      page,
      limit,
      sortBy,
      sortType,
      name,
      email,
      role,
      status,
    });

    // pagination
    const totalItems = await count({
      name,
      email,
      role,
      status,
    });
    const totalPage = Math.ceil(totalItems / limit);
    const pagination = getPagination({ page, limit, totalItems, totalPage });

    // HEATOAS

    const qs = {
      limit,
      name,
      email,
      role,
      status,
      sortType,
      sortBy,
    };

    const links = heatoasLinks(
      { url: req.url, path: req.path },
      pagination,
      qs
    );

    // generate the response message
    const response = {
      code: 200,
      message: "Users Found",
      data: users,
      pagination,
      links,
    };

    res.status(200).json(response);
  } catch (err) {
    console.log("[All Users Find]", err);
    next(serverError());
  }
};
module.exports = getAllUsers;
