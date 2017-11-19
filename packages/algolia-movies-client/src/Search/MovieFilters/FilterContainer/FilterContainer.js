import React from "react";
import classnames from "classnames";
import { pure } from "recompose";
import PropTypes from "prop-types";
import ClearIcon from "react-icons/lib/md/highlight-remove";

import Card from "../../../common/Card";
import "./FilterContainer.css";

const FilterContainer = ({ title, showClearButton, onClearClicked, children }) => (
  <Card className="FilterContainer">
    <span className="FilterContainer__title">
      <span>{title}</span>
      <button
        className={classnames("FilterContainer__clear", {
          "FilterContainer__clear--hidden": !showClearButton,
        })}
        onClick={onClearClicked}>
        <ClearIcon />
      </button>
    </span>
    {children}
  </Card>
);

FilterContainer.propTypes = {
  title: PropTypes.string.isRequired,
  showClearButton: PropTypes.bool,
  onClearClicked: PropTypes.func,
};

FilterContainer.defaultProps = {
  showClearButton: false,
  onClearClicked: () => {},
};

export default pure(FilterContainer);
