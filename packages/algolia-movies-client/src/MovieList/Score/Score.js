import React from "react";
import PropTypes from "prop-types";
import classnames from "classnames/dedupe";

import "./Score.css";

const Score = ({ className, value }) => {
  const color = computeScoreColor(value);
  const style = { color, borderColor: color };
  return (
    <span className={classnames("Score", className)} style={style}>
      {Math.round(value)}
    </span>
  );
};

// TODO: find nicer colors
const BAD_MOVIE_COLOR = [255, 0, 0];
const AVERAGE_MOVIE_COLOR = [255, 165, 0];
const GOOD_MOVIE_COLOR = [0, 255, 0];
function computeScoreColor(score) {
  return score < 5
    ? computeColorInRange(BAD_MOVIE_COLOR, AVERAGE_MOVIE_COLOR, score / 5)
    : computeColorInRange(AVERAGE_MOVIE_COLOR, GOOD_MOVIE_COLOR, (score - 5) / 5);
}

// Lifted from https://stackoverflow.com/questions/30143082/how-to-get-color-value-from-gradient-by-percentage-with-javascript
function computeColorInRange(color2, color1, weight) {
  const p = weight;
  const w = p * 2 - 1;
  const w1 = (w / 1 + 1) / 2;
  const w2 = 1 - w1;
  const rgb = [
    Math.round(color1[0] * w1 + color2[0] * w2),
    Math.round(color1[1] * w1 + color2[1] * w2),
    Math.round(color1[2] * w1 + color2[2] * w2),
  ];
  return `rgb(${rgb.join(",")})`;
}

Score.propTypes = {
  className: PropTypes.string,
  value: PropTypes.number.isRequired,
};

export default Score;
