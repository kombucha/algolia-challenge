export const stateFromSearchResult = (prevState, searchResults) => {
  const genreFacet = searchResults.facets.genre
    ? Object.entries(searchResults.facets.genre).reduce((acc, [genre, hits]) => {
        acc[genre] = {
          hits,
          selected: prevState.genreFacet[genre] ? prevState.genreFacet[genre].selected : false,
        };
        return acc;
      }, {})
    : {};

  return {
    movies: searchResults.hits,
    currentPage: searchResults.page,
    totalPages: searchResults.nbPages,
    genreFacet,
  };
};

export const genresFacetFilter = genreFacet =>
  Object.entries(genreFacet).reduce((acc, [genre, config]) => {
    if (config.selected) {
      acc.push(`genre:${genre}`);
    }
    return acc;
  }, []);

export const clearGenreFacetFilter = genreFacet =>
  Object.entries(genreFacet).reduce((acc, [genre, config]) => {
    acc[genre] = { ...config, selected: false };
    return acc;
  }, {});

export default {
  stateFromSearchResult,
  genresFacetFilter,
};
