import React from "react";
import PropTypes from "prop-types";
import { pure } from "recompose";

import Chip from "../../Chip";
import Rating from "../../Rating";
import "./MovieItem.css";

const EMPTY_ARRAY = [];

const MovieItem = ({ movie }) => (
  <div className="MovieItem">
    <div className="MovieItem__poster" style={{ backgroundImage: `url(${movie.image})` }} />
    <div className="MovieItem__description">
      <span
        className="MovieItem__title"
        dangerouslySetInnerHTML={{
          __html: movie._highlightResult.title.value,
        }}
      />
      <Rating className="MovieItem__rating" value={movie.rating} />
      <span className="MovieItem__year">{movie.year}</span>
      <ul className="MovieItem__genres">
        {/* NB: Genre can be an empty array. And when it is, it doesn't appear at all in _highlightResult !*/}
        {(movie._highlightResult.genre || EMPTY_ARRAY).map(genre => (
          <li className="MovieItem__genre" key={genre.value}>
            <Chip>
              <span
                dangerouslySetInnerHTML={{
                  __html: genre.value,
                }}
              />
            </Chip>
          </li>
        ))}
      </ul>
    </div>
  </div>
);

MovieItem.propTypes = {
  movie: PropTypes.object.isRequired,
};

export default pure(MovieItem);
