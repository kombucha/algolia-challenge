import React, { Component } from "react";
import PropTypes from "prop-types";
import deepEqual from "deep-equal";
import { toast } from "react-toastify";

import KawaiiPlanet from "../common/KawaiiPlanet";
import Card from "../common/Card";
import DelayedComponent from "../common/DelayedComponent";
import Button from "../common/Button";
import Pagination from "../common/Pagination";
import LoadingMask from "../common/LoadingMask";
import moviesService from "../movies.service";
import { generateAlgoliaFilters, DEFAULT_FILTERS } from "./MovieFilters/utils";
import { updateStateFromSearchResults, stateToQueryParams, stateFromQueryParams } from "./utils";
import SearchInput from "./SearchInput";
import MovieFilters from "./MovieFilters";
import MovieList from "./MovieList";

import "./Search.css";

// Enhancement -> smooth scroll
const scrollToTop = () => window.scrollTo(0, 0);

class Search extends Component {
  state = {
    movies: [],
    currentPage: -1,
    totalPages: -1,
    searchText: "",
    filters: DEFAULT_FILTERS,
    loading: false,
  };

  componentDidMount = () => {
    this.setState(stateFromQueryParams(this.props.location.search));
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

      this.props.history.replace({ search: `?${stateToQueryParams(nextState)}` });
    }
  };

  // Filtering change handlers
  _handleSearchChange = searchText => this.setState({ searchText, currentPage: 0 });
  _handlerFiltersChanged = filters => this.setState({ filters, currentPage: 0 });
  _handleResetSearch = () =>
    this.setState({ searchText: "", filters: DEFAULT_FILTERS, currentPage: 0 });
  _handlePageChange = currentPage => this.setState({ currentPage });

  _handleMovieDelete = movieId => {
    if (window.confirm(`Are you sure you want to delete this movie ?`)) {
      moviesService
        .remove(movieId)
        .then(this._refreshSearchResults)
        .catch(e => {
          toast.error("Failed to delete movie");
        });
    }
  };

  _handleCreateMovie = () => {
    this.props.history.push("/create");
  };

  _refreshSearchResults = () => {
    this._updateSearchResults(this.state.searchText, {
      page: this.state.currentPage,
      ...generateAlgoliaFilters(this.state.filters),
    });
  };

  _updateSearchResults = (query, options) => {
    // Clear current search if it's pending
    if (this._currentSearch) {
      this._currentSearch.cancel();
    }

    // Launch new search
    this._currentSearch = moviesService.search(query, options);

    // Update state when it's done
    this.setState({ loading: true });
    this._currentSearch
      .then(searchResults => {
        this._currentSearch = null;
        this.setState({
          ...updateStateFromSearchResults(this.state, searchResults),
          loading: false,
        });
        scrollToTop();
      })
      .catch(e => {
        toast.error("Search failed");
      });
  };

  _renderEmptyResults = () => (
    <Card className="Search__empty">
      <KawaiiPlanet />
      <span>Oh noes, we couldn't find anything !</span>
      <button className="Search__reset-button" onClick={this._handleResetSearch}>
        Reset and try again
      </button>
    </Card>
  );

  _renderLoadingMask = () => (
    <DelayedComponent delay={300}>
      <LoadingMask />
    </DelayedComponent>
  );

  render = () => {
    const { movies, currentPage, totalPages, searchText, filters, loading } = this.state;

    const shouldRenderEmptyResults = !movies.length && !loading;
    const shouldRenderResults = !!movies.length;
    const shouldRenderPagination = totalPages > 1;

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
          {loading && this._renderLoadingMask()}
          <div className="Search__results">
            {shouldRenderEmptyResults && this._renderEmptyResults()}
            {shouldRenderResults && (
              <MovieList
                className="Search__list"
                movies={movies}
                onDeleteMovie={this._handleMovieDelete}
              />
            )}
            {shouldRenderPagination && (
              <Pagination
                className="Search__pagination"
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={this._handlePageChange}
              />
            )}
          </div>
          <div className="Search__right-pane">
            <Button className="Search__create" onClick={this._handleCreateMovie}>
              Create new movie
            </Button>
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
