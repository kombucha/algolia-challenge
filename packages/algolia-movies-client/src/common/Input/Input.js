import React from "react";
import classnames from "classnames/dedupe";

import "./Input.css";

const Input = ({ className, ...rest }) => (
  <input className={classnames("Input", className)} {...rest} />
);

export default Input;
