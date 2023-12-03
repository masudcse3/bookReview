/** @format */
const { findOne } = require("../../../../lib/book/");
const { notFound } = require("../../../../utils/error");
const findById = async (req, res, next) => {
  const { id: bookId } = req.params;

  try {
    const data = await findOne(bookId);
    if (!data) {
      return next(notFound("No book found"));
    }

    const response = {
      code: 200,
      message: "Book found",
      data,
      links: {
        self: `${req.url}`,
      },
    };
    res.status(200).json(response);
  } catch (err) {
    console.log("[find Book by ID]", err);
    next(err);
  }
};
module.exports = findById;
