import React from "react";
import PropTypes from "prop-types";

import FilterContainer from "../FilterContainer";
import RatingSlider from "../../../common/RatingSlider";
import "./RatingFilter.css";

const RatingFilter = ({ minRating, onRatingChanged }) => (
  <FilterContainer title="Min. rating">
    <RatingSlider
      value={minRating}
      onChange={ev => onRatingChanged(parseInt(ev.target.value, 10))}
    />
  </FilterContainer>
);

RatingFilter.propTypes = {
  minRating: PropTypes.number.isRequired,
  onRatingChanged: PropTypes.func.isRequired,
};

export default RatingFilter;
