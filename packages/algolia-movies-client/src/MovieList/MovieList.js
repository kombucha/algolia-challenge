import React from "react";
import PropTypes from "prop-types";
import MovieItem from "./MovieItem";
import Card from "../Card";
import "./MovieList.css";

export const MovieList = ({ className, movies, onDeleteMovie }) => (
  <Card className={className}>
    <ul className="MovieList">
      {movies.map(m => (
        <li key={m.objectID} className="MovieList__item">
          <MovieItem movie={m} onDeleteClicked={onDeleteMovie} />
        </li>
      ))}
    </ul>
  </Card>
);

MovieList.propTypes = {
  className: PropTypes.string,
  movies: PropTypes.arrayOf(PropTypes.object).isRequired,
  onDeleteMovie: PropTypes.func.isRequired,
};

export default MovieList;
