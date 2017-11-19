const MongoClient = require("mongodb").MongoClient;
const logger = require("./logger");

let dbPromise;
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

function close() {
  if (!dbPromise) {
    return;
  }

  return dbPromise.then(connection => {
    connection.close();
  });
}

module.exports = { get, close };
