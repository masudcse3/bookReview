/** @format */

const { deleteOne } = require("../../../../lib/user/");

const deleteUser = async (req, res, next) => {
  const id = req.params.id;
  try {
    await deleteOne(id);
    const response = {
      code: 204,
      message: "Delete successfull",
    };
    res.status(204).json(response);
  } catch (err) {
    console.log("[Delete USer]", err);
    next(err);
  }
};

module.exports = deleteUser;
