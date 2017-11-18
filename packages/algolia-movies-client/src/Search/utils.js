import { updateFilters } from "../MovieFilters/utils";

export const stateFromSearchResult = (prevState, searchResults) => {
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

export default {
  stateFromSearchResult,
};
