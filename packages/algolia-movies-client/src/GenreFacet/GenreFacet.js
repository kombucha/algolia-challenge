import React from "react";
import classnames from "classnames";
import { pure } from "recompose";
import PropTypes from "prop-types";

import Card from "../Card";
import "./GenreFacet.css";

const GenreFacet = ({ genres, onGenreClicked, onClearClicked }) => (
  <Card className="GenreFacet">
    <span className="GenreFacet__title">Genres</span>
    <ul className="GenreFacet__list">
      {Object.entries(genres).map(([genre, config]) => (
        <li
          className={classnames("GenreFacet__item", {
            "GenreFacet__item--selected": config.selected,
          })}
          key={genre}
          onClick={() => onGenreClicked(genre)}>
          <span className="GenreFacet__genre">{genre}</span>
          <span className="GenreFacet__hits">{config.hits}</span>
        </li>
      ))}
    </ul>
    <button onClick={onClearClicked}>Clear all</button>
  </Card>
);

GenreFacet.propTypes = {
  genres: PropTypes.object.isRequired,
  onGenreClicked: PropTypes.func.isRequired,
  onClearClicked: PropTypes.func.isRequired,
};

export default pure(GenreFacet);
