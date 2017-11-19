const movieIndex = require("./movies.index");
const uuid = require("uuid/v4");
const db = require("../db");
const logger = require("../logger");
const { CustomError } = require("../errors");
const { validateModel, formatValidationErrors } = require("../utils");
const movieSchema = require("./movies.schema.json");

const COLLECTION_NAME = "movies";

const create = async movie => {
  const createdMovie = Object.assign({}, movie, { objectID: uuid() });

  const validationErrors = validateModel(movieSchema, createdMovie);

  if (validationErrors) {
    throw new CustomError("Movie validation error", 400, {
      errors: formatValidationErrors(validationErrors),
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
