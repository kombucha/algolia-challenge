import React from "react";
import classnames from "classnames/dedupe";
import PropTypes from "prop-types";

import Rating from "../Rating";
import Slider from "../Slider";
import "./RatingSlider.css";

const RatingSlider = ({ className, name, id, value, onChange }) => (
  <div className={classnames("RatingSlider", className)}>
    <Slider
      id={id}
      name={name}
      className="RatingSlider__input"
      min="0"
      max="5"
      value={value}
      onChange={onChange}
    />
    <Rating value={value} />
  </div>
);

RatingSlider.propTypes = {
  id: PropTypes.string,
  name: PropTypes.string,
  className: PropTypes.string,
  value: PropTypes.number.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default RatingSlider;
