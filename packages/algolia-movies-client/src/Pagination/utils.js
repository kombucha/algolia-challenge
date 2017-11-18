export const range = (min, max) =>
  Array(max - min)
    .fill(0)
    .map((_, idx) => min + idx);

export const generatePagesWindow = (currentPage, totalPages) => {
  if (currentPage < 0) {
    throw new Error(`Invalid currentPage: ${currentPage}`);
  } else if (totalPages <= 0) {
    throw new Error(`Invalid totalPages: ${totalPages}`);
  } else if (currentPage >= totalPages) {
    throw new Error(`Invalid paging parameters: ${currentPage}/${totalPages}`);
  }
  if (currentPage < 3) {
    return range(0, Math.min(totalPages, 7));
  } else if (currentPage > totalPages - 4) {
    return range(Math.max(0, totalPages - 7), totalPages);
  } else {
  }

  return range(Math.max(0, currentPage - 3), Math.min(currentPage + 4, totalPages));
};

export default {
  range,
  generatePagesWindow,
};
