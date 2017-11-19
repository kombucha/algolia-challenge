import queryString from "query-string";

import { updateFilters, DEFAULT_FILTERS } from "../MovieFilters/utils";

/**
 * Update state from search results
 * @param {object} [prevState] The previous state
 * @param {object} [searchResults] Search results as returned by the algolia client
 * @return {object} the new state
 */
export const updateStateFromSearchResults = (prevState, searchResults) => {
  const filters = updateFilters(prevState.filters, {
    genre: searchResults.facets.genre,
    rating: prevState.filters.rating,
  });

  return {
    movies: searchResults.hits,
    currentPage: searchResults.page,
    totalPages: searchResults.nbPages,
    filters,
  };
};

/**
 * Serialize search state to query params
 * @param {object} [state] The search state
 * @returns {string} A query params string
 */
export const stateToQueryParams = state => {
  const queryParams = {
    page: state.currentPage,
    query: state.searchText,
    rating: state.filters.rating,
    genre: Object.entries(state.filters.genre)
      .reduce((acc, [genre, config]) => {
        if (config.selected) {
          acc.push(genre);
        }
        return acc;
      }, [])
      .join("|"),
  };

  return queryString.stringify(queryParams);
};

/**
 * Deserialize search state from query params
 * @param {string} searchString
 * @returns {object} the search state
 */
export const stateFromQueryParams = searchString => {
  const queryParams = queryString.parse(searchString);
  const searchText = queryParams.query || "";
  const currentPage = queryParams.page ? parseInt(queryParams.page, 10) : 0;
  const filters = {
    rating: queryParams.rating ? parseInt(queryParams.rating, 10) : DEFAULT_FILTERS.rating,
    genre: queryParams.genre
      ? queryParams.genre.split("|").reduce((acc, genre) => {
          acc[genre] = { selected: true, hits: 0 };
          return acc;
        }, {})
      : DEFAULT_FILTERS.genre,
  };

  return { searchText, currentPage, filters };
};

export default {
  updateStateFromSearchResults,
  stateFromQueryParams,
};
