/** @format */

const { updateOne: updateReviewService } = require("../../../../lib/review");

const updateOne = async (req, res, next) => {
  const id = req.params.id;
  const { ratting, comment, status } = req.body;
  try {
    const review = await updateReviewService({ id, ratting, comment, status });
    const response = {
      code: 200,
      message: "Review updated successfully",
      review,
      links: {
        self: req.url,
      },
    };

    res.status(200).json(response);
  } catch (err) {
    next(err);
  }
};

module.exports = updateOne;
