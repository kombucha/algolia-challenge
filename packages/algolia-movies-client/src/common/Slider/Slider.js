import React from "react";
import classnames from "classnames/dedupe";

import "./Slider.css";

const Slider = ({ className, type, ...rest }) => (
  <input className={classnames("Slider", className)} type="range" {...rest} />
);

export default Slider;
