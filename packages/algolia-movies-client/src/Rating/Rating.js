import React from "react";
import PropTypes from "prop-types";
import classnames from "classnames/dedupe";

import "./Rating.css";

const Rating = ({ className, value }) => {
  const color = computeRatingColor(value);
  const style = { color, borderColor: color };
  return (
    <span className={classnames("Rating", className)} style={style}>
      {Math.round(value)}
    </span>
  );
};

// TODO: find nicer colors
function computeRatingColor(rating) {
  if (rating >= 4) {
    return "rgb(0, 255, 0)";
  } else if (rating >= 2) {
    return "rgb(255, 165, 0)";
  }

  return "rgb(255, 0, 0)";
}

Rating.propTypes = {
  className: PropTypes.string,
  value: PropTypes.number.isRequired,
};

export default Rating;
