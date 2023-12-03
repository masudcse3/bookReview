/** @format */

const { findOne } = require("../../../../lib/user");

const findById = async (req, res, next) => {
  const { id } = req.params;
  try {
    const user = await findOne(id);
    const response = {
      code: 200,
      message: "User Found",
      data: {
        ...user,
      },
      links: {
        self: `/users/${id}`,
      },
    };
    res.status(200).json(response);
  } catch (err) {
    console.log("[Find User By ID]", err);
    next(err);
  }
};
module.exports = findById;
