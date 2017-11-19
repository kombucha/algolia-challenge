const movieIndex = require("./movies.index");

const create = async () => {};

const remove = async movieId => {
  await movieIndex.deleteObject(movieId);
  // TODO: delete from db
  return movieId;
};

module.exports = {
  create,
  remove,
};
