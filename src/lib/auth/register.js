/** @format */

const { create } = require("../user/");

const register = async ({ name, email, password, role, status }) => {
  const user = await create({ name, email, password, role, status });
  const payload = {
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role,
    status: user.status,
  };

  return {
    ...payload,
  };
};

module.exports = register;
