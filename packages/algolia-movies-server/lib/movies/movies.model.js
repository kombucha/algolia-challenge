const movieIndex = require("./movies.index");
const uuid = require("uuid/v4");
const db = require("../db");

const COLLECTION_NAME = "movies";

const create = async movie => {
  const createdMovie = Object.assign({}, movie, { objectID: uuid() });

  const database = await db.get();
  await database.collection(COLLECTION_NAME).insert(createdMovie);

  await movieIndex.addObject(createdMovie);

  return createdMovie;
};

const remove = async objectID => {
  const database = await db.get();
  await database.collection(COLLECTION_NAME).remove({ objectID });

  await movieIndex.deleteObject(objectID);

  return objectID;
};

module.exports = {
  create,
  remove,
};
