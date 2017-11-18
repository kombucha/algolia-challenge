import React, { Component } from "react";
import PropTypes from "prop-types";
import queryString from "query-string";

import SearchInput from "../SearchInput";
import GenreFacet from "../GenreFacet";
import MovieList from "../MovieList";
import Pagination from "../Pagination";
import moviesService from "../movies.service";
import { stateFromSearchResult, genresFacetFilter, clearGenreFacetFilter } from "./utils";

import "./Search.css";

class Search extends Component {
  state = { movies: [], currentPage: -1, totalPages: -1, searchText: "", genreFacet: {} };

  _handleSearchChange = searchText => {
    this.setState({ searchText, currentPage: 0 });
  };

  _handlePageChange = currentPage => this.setState({ currentPage });

  _handleGenreSelected = genre => {
    const genreConfig = this.state.genreFacet[genre];
    const genreFacet = {
      ...this.state.genreFacet,
      [genre]: { ...genreConfig, selected: !genreConfig.selected },
    };

    this.setState({ genreFacet });
  };

  _handleGenreSelectionCleared = () => {
    const genreFacet = clearGenreFacetFilter(this.state.genreFacet);
    this.setState({ genreFacet });
  };

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
    const genresFilter = genresFacetFilter(this.state.genreFacet);
    const nextGenresFilter = genresFacetFilter(nextState.genreFacet);

    if (
      this.state.searchText !== nextState.searchText ||
      this.state.currentPage !== nextState.currentPage ||
      genresFilter.join("|") !== nextGenresFilter.join("|")
    ) {
      this._updateSearchResults(nextState.searchText, {
        page: nextState.currentPage,
        facetFilters: nextGenresFilter,
      });
    }

    const queryParams = {
      page: nextState.currentPage,
      query: nextState.searchText,
    };
    this.props.history.push({ search: `?${queryString.stringify(queryParams)}` });
  };

  render() {
    const { movies, currentPage, totalPages, searchText, genreFacet } = this.state;
    const shouldDisplayPagination = !!movies.length && totalPages > 1;
    const shouldDisplayFilters = Object.keys(genreFacet).length > 0;

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
            <MovieList className="Search__list" movies={movies} />

            {shouldDisplayPagination && (
              <Pagination
                className="Search__pagination"
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={this._handlePageChange}
              />
            )}
          </div>
          {shouldDisplayFilters && (
            <div className="Search__facets">
              <GenreFacet
                genres={genreFacet}
                onGenreClicked={this._handleGenreSelected}
                onClearClicked={this._handleGenreSelectionCleared}
              />
            </div>
          )}
        </div>
      </div>
    );
  }
}

Search.propTypes = {
  history: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
};

export default Search;
