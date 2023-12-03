/** @format */

const bcryptjs = require("bcryptjs");
const creatHash = async (password) => {
  const salt = await bcryptjs.genSalt(10);
  const hash = await bcryptjs.hash(password, salt);
  return hash;
};
const checkHash = async (password, hash) => {
  const result = await bcryptjs.compare(password, hash);
  return result;
};

module.exports = {
  creatHash,
  checkHash,
};
