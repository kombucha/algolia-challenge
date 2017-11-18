import React, { PureComponent } from "react";
import SearchInput from "../SearchInput";
import MovieList from "../MovieList";
import Pagination from "../Pagination";
import moviesService from "../movies.service";

import "./Search.css";

class Search extends PureComponent {
  state = { movies: [], currentPage: 0, totalPages: 0, searchText: "" };

  _handleSearchChange = searchText => {
    this.setState({ searchText });
  };

  _handlePageChange = newPage => {
    this.setState({ currentPage: newPage });
  };

  _updateSearchResults = (query, page) => {
    return moviesService.search(query, { page }).then(searchResults => {
      console.log(searchResults);
      this.setState({
        movies: searchResults.hits,
        currentPage: searchResults.page,
        totalPages: searchResults.nbPages,
      });
    });
  };

  componentDidMount = () => {
    this._updateSearchResults("", 0);
  };

  componentWillUpdate = (nextProps, nextState) => {
    if (
      this.state.searchText !== nextState.searchText ||
      this.state.currentPage !== nextState.currentPage
    ) {
      this._updateSearchResults(nextState.searchText, nextState.currentPage);
    }
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

export default Search;
