/** @format */

const { updateOne } = require("../../../../lib/user");
const { findUserById } = require("../../../../lib/user/utils");
const updateUser = async (req, res, next) => {
  const id = req.params.id;

  const { name, password = "", role, status, email } = req.body;

  try {
    const user = await findUserById(id);
    const data = await updateOne({
      id,
      name: name || user.name,
      email: user.email,
      password: password || user.password,
      role: role || user.role,
      status: status || user.status,
      email: email || user.email,
    });
    const response = {
      code: 200,
      message: "User updated successfull",
      data: {
        ...data,
      },
      links: {
        self: `/users/${id}`,
      },
    };
    res.status(200).json(response);
  } catch (err) {
    next(err);
  }
};
module.exports = updateUser;
