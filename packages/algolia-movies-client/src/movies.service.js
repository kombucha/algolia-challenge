import algoliaSearch from "algoliasearch/lite";
import CancelablePromise from "cancelable-promise";

const client = algoliaSearch(
  process.env.REACT_APP_ALGOLIA_APP_ID,
  process.env.REACT_APP_ALGOLIA_SEARCH_KEY
);
const moviesIndex = client.initIndex("movies");

export function search(query, options) {
  return new CancelablePromise((resolve, reject) => {
    moviesIndex.search({ query, hitsPerPage: 10, ...options }).then(resolve, reject);
  });
}

export function create(movie) {}
export function remove(id) {}

export default {
  search,
  create,
  remove,
};
