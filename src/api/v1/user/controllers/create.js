/** @format */

const { create, allUsers } = require("../../../../lib/user");
const createUser = async (req, res, next) => {
  const { name, email, password, role, status } = req.body;
  try {
    const user = await create({ name, email, password, role, status });

    const response = {
      code: 201,
      message: "User created successfully",
      data: { ...user },
      links: {
        self: `/users/${user.id}`,
        edit: `/users/${user.id}/edit`,
        delete: `/users/${user.id}/delete`,
        view: `/users/${user.id}/view`,
      },
    };
    res.status(201).json(response);
  } catch (error) {
    next(error);
  }
};

module.exports = createUser;
