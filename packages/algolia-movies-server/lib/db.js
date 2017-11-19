const MongoClient = require("mongodb").MongoClient;
const logger = require("./logger");

let dbPromise;
/**
 * Gets the singleton mongodb connection.
 * @returns {Promise} A promise containing the MongoDB connection, or a rejected promise otherwise.
 */
function get() {
  if (!dbPromise) {
    dbPromise = MongoClient.connect(process.env.DB_URI);
    dbPromise
      .then(client => {
        logger.info("Succesfully connected to mongo database");
        return client;
      })
      .catch(e => {
        logger.error("Failed to connect to mongodb", e);
        throw e;
      });
  }

  return dbPromise;
}

/**
 * Closes the mongodb singleton if it exists, does nothing otherwise
 * @returns {Promise}
 */
function close() {
  if (!dbPromise) {
    return Promise.resolve();
  }

  return dbPromise.then(connection => {
    connection.close();
  });
}

module.exports = { get, close };
