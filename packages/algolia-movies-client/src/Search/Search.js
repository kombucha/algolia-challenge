import React, { PureComponent } from "react";
import SearchInput from "../SearchInput";
import MovieList from "../MovieList";
import moviesService from "../movies.service";

import "./Search.css";

class Search extends PureComponent {
  state = { movies: [], searchText: "" };

  _handleSearchChange = searchText => {
    this.setState({ searchText });
  };

  _updateSearchResults = query => {
    return moviesService.search(query).then(searchResults => {
      console.log(searchResults);
      this.setState({ movies: searchResults.hits });
    });
  };

  componentDidMount = () => {
    this._updateSearchResults("");
  };

  componentWillUpdate = (nextProps, nextState) => {
    if (this.state.searchText !== nextState.searchText) {
      this._updateSearchResults(nextState.searchText);
    }
  };

  render() {
    const { movies, searchText } = this.state;
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
      </div>
    );
  }
}

export default Search;
