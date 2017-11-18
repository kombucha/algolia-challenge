import React from "react";
import PropTypes from "prop-types";
import "./Header.css";

const Header = ({ title, children }) => (
  <header className="Header">
    <h1 className="Header__title">{title}</h1>
    <div className="Header__spacer" />
    {children}
  </header>
);

Header.propTypes = {
  title: PropTypes.string.isRequired,
};

export default Header;
