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
/**
 * Search Movies.
 * @param {string} [query]  the text query
 * @param {object} [options] other options
 * @returns {CancelablePromise} Algolia search results cancelable promise
 */
export function search(query, options) {
  return new CancelablePromise((resolve, reject) => {
    moviesIndex.search({ query, ...DEFAULT_SEARCH_OPTIONS, ...options }).then(results => {
      results.hits = results.hits.filter(movie => !hackyDeletionCache.has(movie.objectID));
      resolve(results);
    }, reject);
  });
}

/**
 * Gets movie facets suggestions (genres + actors)
 * @returns {CancelablePromise} A promise containing a object, each key is an array of possible values.
 */
export function getSuggestions(facets) {
  return new CancelablePromise((resolve, reject) => {
    Promise.all([
      moviesIndex.searchForFacetValues({ facetName: "genre", facetQuery: "", maxFacetHits: 30 }),
      moviesIndex.searchForFacetValues({ facetName: "actors", facetQuery: "", maxFacetHits: 30 }),
    ]).then(([genres, actors]) => {
      resolve({
        genres: genres.facetHits.map(g => g.value),
        actors: actors.facetHits.map(g => g.value),
      });
    }, reject);
  });
}

/**
 * Creates a movie.
 * @param {object} movie
 * @return {Promise} A promise
 */
export function create(movie) {
  const formData = new FormData();
  formData.append("movie", JSON.stringify({ ...movie, image: null }));
  formData.append("image", movie.image);

  return fetch("/api/1/movies/", {
    method: "POST",
    body: formData,
  }).then(r => (r.ok ? Promise.resolve(r.statusText) : Promise.reject(r.statusText)));
}

/**
 * Deletes a movie.
 * @param {string} [movieId] The movie id
 * @returns {Promise} A promise
 */
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

/**
 * Very basic movie validation
 * @param {object} movie
 * @returns {object|null} An object of errors, null if valid;
 */
export function validateMovie(movie) {
  if (movie.title && movie.image && movie.year) {
    return null;
  }

  return {
    title: movie.title ? undefined : "The title is required",
    year: movie.year ? undefined : "The year is required",
    image: movie.image ? undefined : "The movie poster is required",
  };
}

export default {
  search,
  getSuggestions,
  create,
  remove,
  validateMovie,
};
