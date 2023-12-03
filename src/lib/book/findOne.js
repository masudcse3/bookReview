/** @format */

const Book = require("../../model/Book");

const checkObjectId = require("../../utils/checkObjectId");
const { badRequest, notFound } = require("../../utils/error");
const findOne = async (id) => {
  try {
    if (!checkObjectId(id)) {
      throw badRequest("Your id param is incorrect");
    }
    const book = await Book.findOne({ _id: id, status: "published" }).populate({
      path: "author",
      select: "name",
    });
    console.log(book);
    if (!book) {
      throw notFound("No book found");
    }

    return {
      ...book._doc,
    };
  } catch (err) {
    console.log("[Find Book By ID]", err);
  }
};
module.exports = findOne;
