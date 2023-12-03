/** @format */
const bookServices = require("../../../../lib/book");

const createBook = async (req, res, next) => {
  const { title, writter, price, cover, publication } = req.body;
  const author = req.user;

  try {
    const book = await bookServices.createBook({
      title,
      writter,
      price,
      publication,
      cover,
      author,
    });
    const response = {
      code: 201,
      message: "Book Created successfull",
      data: {
        id: book._id,
        ...book._doc,
        author: {
          id: author.id,
          name: author.name,
        },
      },
    };
    res.status(201).json(response);
  } catch (e) {
    next(e);
  }
};

module.exports = createBook;
