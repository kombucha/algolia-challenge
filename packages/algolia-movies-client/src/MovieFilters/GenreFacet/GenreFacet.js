import React from "react";
import classnames from "classnames";
import { pure } from "recompose";
import PropTypes from "prop-types";

import FilterContainer from "../FilterContainer";
import "./GenreFacet.css";

const shouldDisplayClearButton = genres => Object.values(genres).some(g => g.selected);

const GenreFacet = ({ genres, onGenreClicked, onClearClicked }) => (
  <FilterContainer
    title="Genres"
    onClearClicked={onClearClicked}
    showClearButton={shouldDisplayClearButton(genres)}>
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
  </FilterContainer>
);

GenreFacet.propTypes = {
  genres: PropTypes.object.isRequired,
  onGenreClicked: PropTypes.func.isRequired,
  onClearClicked: PropTypes.func.isRequired,
};

export default pure(GenreFacet);
