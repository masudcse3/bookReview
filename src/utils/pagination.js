/** @format */

const getPagination = ({ page, limit, totalItems, totalPage }) => {
  const pagination = {
    page,
    limit,
    totalPage,
    totalItems,
  };
  if (page < totalPage) {
    pagination.next = page + 1;
  }
  if (totalPage > 1) {
    pagination.prev = page - 1;
  }
  return pagination;
};

module.exports = getPagination;
