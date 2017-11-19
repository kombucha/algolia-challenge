import React from "react";
import PropTypes from "prop-types";

import "./Button.css";

const Button = ({ children, disabled, onClick }) => (
  <button className="Button" onClick={onClick} disabled={disabled}>
    {children}
  </button>
);

Button.propTypes = {
  onClick: PropTypes.func,
  disabled: PropTypes.bool,
};

Button.defaultProps = {
  onClick: () => {},
  disabled: false,
};

export default Button;
