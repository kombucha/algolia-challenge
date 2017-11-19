const movieIndex = require("./movies.index");
const uuid = require("uuid/v4");
const db = require("../db");
const logger = require("../logger");
const { CustomError } = require("../errors");
const validateMovie = require("algolia-movies-shared/validation/movie");

const COLLECTION_NAME = "movies";

const create = async movie => {
  const createdMovie = Object.assign({}, movie, { objectID: uuid() });

  const validationErrors = validateMovie(createdMovie);

  if (validationErrors) {
    throw new CustomError("Movie validation error", 400, {
      validationErrors,
    });
  }

  const database = await db.get();
  await database.collection(COLLECTION_NAME).insert(createdMovie);
  await movieIndex.addObject(createdMovie);

  logger.info(`Movie created (${createdMovie.objectID})`);

  return createdMovie;
};

const remove = async objectID => {
  const database = await db.get();
  await database.collection(COLLECTION_NAME).remove({ objectID });
  await movieIndex.deleteObject(objectID);

  logger.info(`Movie deleted (${objectID})`);

  return objectID;
};

module.exports = {
  COLLECTION_NAME,
  create,
  remove,
};
