/** @format */

const {
  findForBook: findForBookService,
} = require("../.../../../../../lib/review");
const { count } = require("../../../../lib/review/utils");
const heatoasLinks = require("../../../../utils/links");
const getPagination = require("../../../../utils/pagination");
const findForBook = async (req, res, next) => {
  const id = req.params.id;
  const { page, limit, sortType, sortBy } = req.query;

  try {
    const reviews = await findForBookService({
      id,
      page,
      limit,
      sortType,
      sortBy,
    });
    const totalItems = await count({ book: id });
    const totalPage = Math.ceil(totalItems / limit);
    const pagination = getPagination({ page, limit, totalItems, totalPage });
    const links = heatoasLinks({ url: req.url, path: req.path }, pagination, {
      limit,
      sortType,
      sortBy,
    });
    const response = {
      code: 200,
      message: "Reviews found",
      data: { ...reviews },
      pagination,
      links,
    };
    res.status(200).json(response);
  } catch (err) {
    next(err);
  }
};

module.exports = findForBook;
