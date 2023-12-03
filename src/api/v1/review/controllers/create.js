/** @format */
const { create } = require("../../../../lib/review");
const { findOne } = require("../../../../lib/book");
const { log } = require("winston");
const { notFound } = require("../../../../utils/error");
const createReview = async (req, res, next) => {
  const { ratting, comment, status } = req.body;
  const bookId = req.params.id;
  const author = req.user;

  try {
    const book = await findOne(bookId);
    if (!book) {
      return next(notFound("No book found to write a review"));
    }
    const review = await create({ ratting, comment, status, author, book });
    const response = {
      code: 201,
      message: "Review created successfull",
      review,
      links: {
        self: req.url,
      },
    };
    res.status(201).json(response);
  } catch (err) {
    console.log("[create review]", err);
    next(err);
  }
};

module.exports = createReview;
