/** @format */

const { log } = require("winston");
const { deleteService } = require("../../../../lib/book");

const deleteBook = async (req, res, next) => {
  const id = req.params.id;

  try {
    await deleteService(id);
    const response = {
      code: 204,
      message: "Book and assosiated reviews are deleted successfull",
    };
    res.status(204).json(response);
  } catch (err) {
    console.log(err);
    next(err);
  }
};

module.exports = deleteBook;
