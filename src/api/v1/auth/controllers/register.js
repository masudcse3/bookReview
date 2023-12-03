/** @format */

const { registerService } = require("../../../../lib/auth");
const { badRequest } = require("../../../../utils/error");

const register = async (req, res, next) => {
  const name = req.body.name;
  const email = req.body.email;
  const password = req.body.password;
  const role = req.body.role || "user";

  try {
    if (role === "admin") {
      res.status(400).json({
        message: "you are not allow for registering as administration",
      });
      throw badRequest("you are not allow for registering as administration");
    }
    const user = await registerService({
      name,
      email,
      password,
      role,
      status: "pending",
    });
    const response = {
      status: 201,
      message: "User register successfull",
      data: {
        ...user,
      },
      links: {
        login: "/auth/login",
      },
    };
    res.status(201).json(response);
  } catch (e) {
    next(e);
  }
};

module.exports = register;
