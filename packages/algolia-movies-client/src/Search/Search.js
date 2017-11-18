import React, { Component } from "react";
import PropTypes from "prop-types";
import queryString from "query-string";

import SearchInput from "../SearchInput";
import MovieList from "../MovieList";
import Pagination from "../Pagination";
import moviesService from "../movies.service";

import "./Search.css";

class Search extends Component {
  state = { movies: [], currentPage: -1, totalPages: -1, searchText: "" };

  _handleSearchChange = searchText => {
    this.setState({ searchText, currentPage: 0 });
  };

  _handlePageChange = newPage => {
    this.setState({ currentPage: newPage });
  };

  _updateSearchResults = (query, page) => {
    if (this._currentSearch) {
      this._currentSearch.cancel();
    }
    this._currentSearch = moviesService.search(query, { page });

    this._currentSearch.then(searchResults => {
      this._currentSearch = null;
      this.setState({
        movies: searchResults.hits,
        currentPage: searchResults.page,
        totalPages: searchResults.nbPages,
      });
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
    if (
      this.state.searchText !== nextState.searchText ||
      this.state.currentPage !== nextState.currentPage
    ) {
      this._updateSearchResults(nextState.searchText, nextState.currentPage);
    }

    const queryParams = {
      page: nextState.currentPage,
      query: nextState.searchText,
    };
    this.props.history.push({ search: `?${queryString.stringify(queryParams)}` });
  };

  componentWillUnmount = () => {
    console.log("bye cruel world");
  };

  render() {
    const { movies, currentPage, totalPages, searchText } = this.state;
    const shouldDisplayPagination = !!movies.length && totalPages > 1;
    return (
      <div className="Search">
        <SearchInput
          className="Search__field"
          placeholder="Search movies"
          value={searchText}
          autoFocus
          onChange={this._handleSearchChange}
        />

        <MovieList className="Search__results" movies={movies} />
        {shouldDisplayPagination && (
          <Pagination
            className="Search__pagination"
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={this._handlePageChange}
          />
        )}
      </div>
    );
  }
}

Search.propTypes = {
  history: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
};

export default Search;
