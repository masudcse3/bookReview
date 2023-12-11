/** @format */

const {
  findAllBooks: findAllBooksService,
  findOne,
} = require("../../../../lib/user");
const getPagination = require("../../../../utils/pagination");

const { totalBookCount } = require("../../../../lib/user/utils");
const heatoasLinks = require("../../../../utils/links");
const { notFound } = require("../../../../utils/error");

const findAllBooks = async (req, res, next) => {
  const id = req.params.id;
  const { page, limit, sortType, sortBy, status } = req.query;

  try {
    const data = await findAllBooksService({
      id,
      page,
      limit,
      sortType,
      sortBy,
      status,
    });

    if (data.length === 0) {
      throw notFound("No Books found for this user");
    }
    const author = await findOne(id);
    const totalItems = await totalBookCount({ id, status });
    const totalPage = Math.ceil(totalItems / limit);
    const pagination = getPagination({ page, limit, totalItems, totalPage });
    const links = heatoasLinks({ url: req.url, path: req.path }, pagination, {
      limit,
      sortType,
      sortBy,
      status,
    });

    const response = {
      data,
      author: {
        id: author._id,
        name: author.name,
      },
      pagination,
      links,
    };
    res.status(200).json(response);
  } catch (err) {
    next(err);
  }
};

module.exports = findAllBooks;
