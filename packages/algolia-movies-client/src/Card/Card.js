import React from "react";
import PropTypes from "prop-types";
import classnames from "classnames/dedupe";

import "./Card.css";

const Card = ({ className, fullBleed, children }) => (
  <div className={classnames("Card", className, { "Card--full-bleed": fullBleed })}>{children}</div>
);

Card.propTypes = {
  className: PropTypes.string,
  fullBleed: PropTypes.bool,
};

Card.defaultProps = {
  fullBleed: false,
};

export default Card;
