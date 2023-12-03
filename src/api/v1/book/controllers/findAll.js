/** @format */

const { findAll: findAllService } = require("../../../../lib/book");
const { count } = require("../../../../lib/book/utils");
const { serverError, notFound } = require("../../../../utils/error");
const heatoasLinks = require("../../../../utils/links");
const getPagination = require("../../../../utils/pagination");

const findAll = async (req, res, next) => {
  const { page, limit, sortBy, sortType, publication, title, writter } =
    req.query;

  try {
    const books = await findAllService({
      page,
      limit,
      sortBy,
      sortType,
      publication,
      writter,
      title,
    });

    const totalItems = await count({ title, publication, writter });
    const totalPage = Math.ceil(totalItems / limit);

    const pagination = getPagination({
      totalItems,
      totalPage,
      limit,
      page,
    });
    const links = heatoasLinks({ url: req.url, path: req.path }, pagination, {
      limit,
      sortBy,
      sortType,
      publication,
      writter,
      title,
    });
    const response = {
      data: books,
      pagination,
      links,
    };

    res.status(200).json(response);
  } catch (err) {
    next(err);
  }
};

module.exports = findAll;
