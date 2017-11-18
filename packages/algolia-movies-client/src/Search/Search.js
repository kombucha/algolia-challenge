import React, { Component } from "react";
import PropTypes from "prop-types";
import queryString from "query-string";
import deepEqual from "deep-equal";
import { KawaiiPlanet } from "react-kawaii";

import Card from "../Card";
import SearchInput from "../SearchInput";
import MovieFilters from "../MovieFilters";
import MovieList from "../MovieList";
import Pagination from "../Pagination";
import moviesService from "../movies.service";
import { stateFromSearchResult } from "./utils";
import { generateAlgoliaFilters, DEFAULT_FILTERS } from "../MovieFilters/utils";

import "./Search.css";

class Search extends Component {
  state = {
    movies: [],
    currentPage: -1,
    totalPages: -1,
    searchText: "",
    filters: DEFAULT_FILTERS,
  };

  componentDidMount = () => {
    const queryParams = queryString.parse(this.props.location.search);
    const searchText = queryParams.query || "";
    const currentPage = queryParams.page ? parseInt(queryParams.page, 10) : 0;
    // Init the state from the query params.
    this.setState({ searchText, currentPage });
  };

  shouldComponentUpdate = (nextProps, nextState) => {
    return this.state !== nextState;
  };

  componentWillUpdate = (nextProps, nextState) => {
    const filters = generateAlgoliaFilters(this.state.filters);
    const nextFilters = generateAlgoliaFilters(nextState.filters);

    if (
      this.state.searchText !== nextState.searchText ||
      this.state.currentPage !== nextState.currentPage ||
      !deepEqual(filters, nextFilters)
    ) {
      this._updateSearchResults(nextState.searchText, {
        page: nextState.currentPage,
        ...nextFilters,
      });
    }

    const queryParams = { page: nextState.currentPage, query: nextState.searchText };
    this.props.history.push({ search: `?${queryString.stringify(queryParams)}` });
  };

  // Filtering change handlers
  _handleSearchChange = searchText => this.setState({ searchText, currentPage: 0 });
  _handlerFiltersChanged = filters => this.setState({ filters, currentPage: 0 });
  _handleResetSearch = () =>
    this.setState({ searchText: "", filters: DEFAULT_FILTERS, currentPage: 0 });
  _handlePageChange = currentPage => this.setState({ currentPage });

  _updateSearchResults = (query, options) => {
    // Clear current search if it's pending
    if (this._currentSearch) {
      this._currentSearch.cancel();
    }

    // Launch new search
    this._currentSearch = moviesService.search(query, options);

    // Update state when it's done
    this._currentSearch.then(searchResults => {
      this._currentSearch = null;
      this.setState(stateFromSearchResult(this.state, searchResults));
    });
  };

  _renderEmptyResults = () => (
    <Card className="Search__empty">
      <KawaiiPlanet size={200} mood="sad" color="#00aeff" />
      <span>Oh noes, we couldn't find anything !</span>
      <button className="Search__reset-button" onClick={this._handleResetSearch}>
        Reset and try again
      </button>
    </Card>
  );
  render = () => {
    const { movies, currentPage, totalPages, searchText, filters } = this.state;
    const shouldDisplayPagination = totalPages > 1;
    // Should have a more robust way of distinguishing between empty results and loading state
    // ie: this.state.loading
    const shouldRenderEmptyResults = !movies.length && totalPages !== -1;

    return (
      <div className="Search">
        <SearchInput
          className="Search__field"
          placeholder="Search movies"
          value={searchText}
          autoFocus
          onChange={this._handleSearchChange}
        />
        <div className="Search__main">
          <div className="Search__results">
            {shouldRenderEmptyResults ? (
              this._renderEmptyResults()
            ) : (
              <MovieList className="Search__list" movies={movies} />
            )}

            {shouldDisplayPagination && (
              <Pagination
                className="Search__pagination"
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={this._handlePageChange}
              />
            )}
          </div>
          <div className="Search__facets">
            <MovieFilters filters={filters} onChange={this._handlerFiltersChanged} />
          </div>
        </div>
      </div>
    );
  };
}

Search.propTypes = {
  history: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
};

export default Search;
