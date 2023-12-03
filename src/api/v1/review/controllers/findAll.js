/** @format */
const { findAll: findAllService } = require("../../../../lib/review");
const { count } = require("../../../../lib/review/utils");
const heatoasLinks = require("../../../../utils/links");
const getPagination = require("../../../../utils/pagination");
const findAll = async (req, res, next) => {
  const { page, limit, sortType, sortBy } = req.query;

  try {
    const reviews = await findAllService({ page, limit, sortBy, sortType });
    const totalItems = await count({ status: "published" });
    const totalPage = Math.ceil(totalItems / limit);
    const pagination = getPagination({ page, limit, totalItems, totalPage });

    const links = heatoasLinks({ url: req.url, path: req.path }, pagination, {
      limit,
      sortType,
      sortBy,
    });

    const response = {
      code: 200,
      message: "Reviews Found",
      data: reviews,
      pagination,
      links,
    };
    res.status(200).json(response);
  } catch (err) {
    next(err);
  }
};

module.exports = findAll;
