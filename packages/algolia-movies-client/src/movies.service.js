import algoliaSearch from "algoliasearch/lite";
import CancelablePromise from "cancelable-promise";

const client = algoliaSearch(
  process.env.REACT_APP_ALGOLIA_APP_ID,
  process.env.REACT_APP_ALGOLIA_SEARCH_KEY
);
const moviesIndex = client.initIndex("movies");

const DEFAULT_SEARCH_OPTIONS = {
  hitsPerPage: 10,
  maxValuesPerFacet: 10,
  facets: ["genre"],
};
export function search(query, options) {
  return new CancelablePromise((resolve, reject) => {
    moviesIndex.search({ query, ...DEFAULT_SEARCH_OPTIONS, ...options }).then(resolve, reject);
  });
}

export function create(movie) {}
export function remove(id) {}

export default {
  search,
  create,
  remove,
};
