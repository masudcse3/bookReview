/** @format */

const checkObjectId = (id) => {
  let bool = false;
  if (id.length === 24) bool = /[a-f]+/.test(id);
  return bool;
};

module.exports = checkObjectId;
