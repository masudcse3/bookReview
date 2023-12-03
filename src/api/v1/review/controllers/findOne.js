/** @format */

const { findOne: findOneService } = require("../../../../lib/review");
const findOne = async (req, res, next) => {
  const id = req.params.id;
  try {
    const review = await findOneService(id);
    const response = {
      code: 200,
      message: "Review found",
      review,
    };
    res.status(200).json(response);
  } catch (err) {
    next(err);
  }
};

module.exports = findOne;
