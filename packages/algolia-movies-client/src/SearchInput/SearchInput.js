import React from "react";
import PropTypes from "prop-types";
import classnames from "classnames/dedupe";
import SearchIcon from "react-icons/lib/md/search";

import "./SearchInput.css";

const SearchInput = ({ className, value, placeholder, autoFocus, onChange }) => (
  <div className={classnames("SearchInput", className)}>
    <SearchIcon className="SearchInput__icon" size="2rem" />
    <input
      className="SearchInput__input"
      type="search"
      placeholder={placeholder}
      autoFocus={autoFocus}
      value={value}
      onChange={e => onChange(e.target.value)}
    />
  </div>
);

SearchInput.propTypes = {
  className: PropTypes.string,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  autoFocus: PropTypes.bool,
};

SearchInput.defaultProps = {
  placeholder: "Search",
  autoFocus: false,
};

export default SearchInput;
