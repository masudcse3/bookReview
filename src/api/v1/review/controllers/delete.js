/** @format */

const { deleteOne: deleteOneService } = require("../../../../lib/review");

const deleteOne = async (req, res, next) => {
  const id = req.params.id;
  try {
    await deleteOneService(id);
    const response = {
      code: 204,
      message: "Review Deleted",
    };
    res.status(204).json(response);
  } catch (err) {
    next(err);
  }
};

module.exports = deleteOne;
