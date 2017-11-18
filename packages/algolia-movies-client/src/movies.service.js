import algoliaSearch from "algoliasearch/lite";

const client = algoliaSearch(
  process.env.REACT_APP_ALGOLIA_APP_ID,
  process.env.REACT_APP_ALGOLIA_SEARCH_KEY
);
const moviesIndex = client.initIndex("movies");

export function search(query, options) {
  return moviesIndex.search({ query, ...options });
}

export function create(movie) {}
export function remove(id) {}

export default {
  search,
  create,
  remove,
};
