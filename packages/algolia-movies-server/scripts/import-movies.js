const db = require("../lib/db");
const movieIndex = require("../lib/movies/movies.index");
const COLLECTION_NAME = require("../lib/movies/movies.model").COLLECTION_NAME;
const logger = require("../lib/logger");

// Start import
(async () => {
  logger.info("Starting the import, this could take some time");

  // Requiring a 9.5Mo file \o/
  const movies = require("./movies.json");
  logger.info(`${movies.length} movies loaded in memory`);

  const database = await db.get();
  logger.info("Loading into database...");
  await database.collection(COLLECTION_NAME).insertMany(movies);
  logger.info("Indexing...");
  await movieIndex.addObjects(movies);

  await db.close();
  logger.info("Kthxbai !");
})();
