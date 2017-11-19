import React from "react";
import PropTypes from "prop-types";

import "./Button.css";

const Button = ({ children, disabled, onClick, color }) => (
  <button
    className="Button"
    style={{ color, borderColor: color }}
    onClick={onClick}
    disabled={disabled}>
    {children}
  </button>
);

Button.propTypes = {
  onClick: PropTypes.func,
  color: PropTypes.string,
  disabled: PropTypes.bool,
};

Button.defaultProps = {
  onClick: () => {},
  color: "#00aeff",
  disabled: false,
};

export default Button;
