const movieIndex = require("./movies.index");
const uuid = require("uuid/v4");

const create = async movie => {
  const createdMovie = Object.assign({}, movie, { objectID: uuid() });
  // Create in algolia index
  await movieIndex.addObject(createdMovie);
  // TODO: add to db
  return createdMovie;
};

const remove = async movieId => {
  await movieIndex.deleteObject(movieId);
  // TODO: delete from db
  return movieId;
};

module.exports = {
  create,
  remove,
};
