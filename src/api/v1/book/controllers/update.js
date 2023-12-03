/** @format */

const { updateOne } = require("../../../../lib/book");

const updateBook = async (req, res, next) => {
  const id = req.params.id;

  const { title, writter, price, cover, publication, status } = req.body;

  try {
    const book = await updateOne({
      id,
      title,
      writter,
      price,
      cover,
      publication,
      status,
    });

    const response = {
      code: 200,
      message: "Book Updated successfull",
      data: book,
    };
    res.status(200).json(response);
  } catch (err) {
    console.log("[Update a book by id]", err);
    next(err);
  }
};

module.exports = updateBook;
