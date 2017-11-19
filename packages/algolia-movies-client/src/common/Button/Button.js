import React from "react";
import PropTypes from "prop-types";

import "./Button.css";

const Button = ({ children, type, disabled, onClick, color }) => (
  <button
    className="Button"
    type={type}
    style={{ color, borderColor: color }}
    onClick={onClick}
    disabled={disabled}>
    {children}
  </button>
);

Button.propTypes = {
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
