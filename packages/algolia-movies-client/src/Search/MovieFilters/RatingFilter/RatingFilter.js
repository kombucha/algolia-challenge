import React from "react";
import PropTypes from "prop-types";

import FilterContainer from "../FilterContainer";
import Rating from "../../../common/Rating";
import "./RatingFilter.css";

const RatingFilter = ({ minRating, onRatingChanged }) => (
  <FilterContainer title="Min. rating">
    <div className="RatingFilter">
      <input
        type="range"
        min="0"
        max="5"
        step="1"
        value={minRating}
        onChange={ev => onRatingChanged(parseInt(ev.target.value, 10))}
      />
      <Rating value={minRating} />
    </div>
  </FilterContainer>
);

RatingFilter.propTypes = {
  minRating: PropTypes.number.isRequired,
  onRatingChanged: PropTypes.func.isRequired,
};

export default RatingFilter;
