/**
 * Update facet filters.
 * @param {object} [prevFilters] the previous filters
 * @param {object} [newFilters] The new filters
 * @returns {object} Internal representation of filters;
 */
export const updateFilters = (prevFilters, newFilters) => {
  const updatedFilters = Object.keys(prevFilters).reduce((filtersAcc, filterName) => {
    if (!newFilters[filterName]) {
      filtersAcc[filterName] = prevFilters[filterName];
    } else if (Number.isInteger(newFilters[filterName])) {
      filtersAcc[filterName] = newFilters[filterName];
    } else {
      filtersAcc[filterName] = Object.entries(newFilters[filterName]).reduce(
        (acc, [facetValue, hits]) => {
          acc[facetValue] = {
            hits,
            selected: prevFilters[filterName][facetValue]
              ? prevFilters[filterName][facetValue].selected
              : false,
          };
          return acc;
        },
        {}
      );
    }

    return filtersAcc;
  }, {});

  return updatedFilters;
};

/**
 * Clear facet filter (ie: unselect all).
 * @param {object} [facets] The facet to clear
 * @returns {object} A clear facet filter;
 */
export const clearFacetFilter = facet =>
  Object.entries(facet).reduce((acc, [facetValue, config]) => {
    acc[facetValue] = { ...config, selected: false };
    return acc;
  }, {});

/**
 * Generates an array of facet filters from the app internal representation
 * Example: { genre: { Adventure: {selected: true} } } -> ['genre:Adventure']
 * @param {Object} facetFilters
 * @returns {array} the generated filter
 */
export const generateAlgoliaFilters = filters => {
  const result = Object.entries(filters).reduce(
    (acc, [filterName, values]) => {
      if (Number.isInteger(values)) {
        acc.numericFilters.push(`${filterName}>=${values}`);
      } else {
        const facetFilters = Object.entries(values).reduce((acc, [value, config]) => {
          if (config.selected) {
            acc.push(`${filterName}:${value}`);
          }
          return acc;
        }, []);
        acc.facetFilters.push(...facetFilters);
      }

      return acc;
    },
    { facetFilters: [], numericFilters: [] }
  );

  if (!result.facetFilters.length) {
    delete result.facetFilters;
  }

  if (!result.numericFilters.length) {
    delete result.numericFilters;
  }

  return result;
};

// We only want good movies by default :)
export const DEFAULT_FILTERS = { genre: {}, rating: 3 };

export default {
  DEFAULT_FILTERS,
  updateFilters,
  generateAlgoliaFilters,
};
