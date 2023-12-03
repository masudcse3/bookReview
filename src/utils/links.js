/** @format */

const queryString = require("./queryString");

const heatoasLinks = ({ url, path }, pagination, query) => {
  const links = {
    self: url,
  };
  if (pagination.next) {
    const next = queryString({ page: pagination.next, ...query });
    links.next = `${path}?${next}`;
  }
  if (pagination.prev) {
    const prev = queryString({ page: pagination.prev, ...query });
    links.prev = `${path}?${prev}`;
  }
  return links;
};

module.exports = heatoasLinks;
