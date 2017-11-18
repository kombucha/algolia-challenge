import React from "react";
import PropTypes from "prop-types";
import classnames from "classnames/dedupe";

import "./Card.css";

const Card = ({ className, children }) => (
  <div className={classnames("Card", className)}>{children}</div>
);

Card.propTypes = {
  className: PropTypes.string,
};

export default Card;
