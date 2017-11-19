import React from "react";
import classnames from "classnames/dedupe";
import PropTypes from "prop-types";

import "./Button.css";

const NO_STYLE = {};

const Button = ({ className, children, type, disabled, onClick, color }) => (
  <button
    className={classnames("Button", className)}
    type={type}
    style={disabled ? NO_STYLE : { color, borderColor: color }}
    onClick={onClick}
    disabled={disabled}>
    {children}
  </button>
);

Button.propTypes = {
  className: PropTypes.string,
  onClick: PropTypes.func,
  type: PropTypes.string,
  color: PropTypes.string,
  disabled: PropTypes.bool,
};

Button.defaultProps = {
  onClick: () => {},
  type: "button",
  color: "#00aeff",
  disabled: false,
};

export default Button;
