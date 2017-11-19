const algoliasearch = require("algoliasearch");

const algoliaClient = algoliasearch(process.env.ALGOLIA_APP_ID, process.env.ALGOLIA_ADMIN_KEY);
const movieIndex = algoliaClient.initIndex("movies");

module.exports = movieIndex;
