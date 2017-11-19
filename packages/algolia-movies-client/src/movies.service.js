import algoliaSearch from "algoliasearch/lite";
import CancelablePromise from "cancelable-promise";

const client = algoliaSearch(
  process.env.REACT_APP_ALGOLIA_APP_ID,
  process.env.REACT_APP_ALGOLIA_SEARCH_KEY
);
const moviesIndex = client.initIndex("movies");

/**
 * FIXME
 * Can't really rely on algolia cache clearing : Event when clearing cache client side and refetching,
 * it's still in their server cache for a few "seconds".
 * So let's store the deleted ids
 * And remove em by hand from responses...
 * Drawbacks:
 * - This won't help if the user refreshes the page and the result is still in algolia cache
 * - I should control that it doesn't grow indefinitely !!! #memoryLeak Could use an lru cache or something...
 */
const hackyDeletionCache = new Set();

const DEFAULT_SEARCH_OPTIONS = {
  hitsPerPage: 10,
  maxValuesPerFacet: 10,
  facets: ["genre"],
};
export function search(query, options) {
  console.log("search");
  return new CancelablePromise((resolve, reject) => {
    moviesIndex.search({ query, ...DEFAULT_SEARCH_OPTIONS, ...options }).then(results => {
      results.hits = results.hits.filter(movie => !hackyDeletionCache.has(movie.objectID));
      resolve(results);
    }, reject);
  });
}

export function create(movie) {}

export function remove(movieId) {
  return fetch(`/api/1/movies/${movieId}`, {
    method: "DELETE",
  }).then(r => {
    const wasSuccesful = r.ok;
    if (wasSuccesful) {
      moviesIndex.clearCache();
      hackyDeletionCache.add(movieId);
    }
    return wasSuccesful ? Promise.resolve(r.statusText) : Promise.reject(r.statusText);
  });
}

export default {
  search,
  create,
  remove,
};
