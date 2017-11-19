import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import "./Header.css";

const Header = ({ title, children }) => (
  <header className="Header">
    <h1 className="Header__title">
      <Link to="/">{title}</Link>
    </h1>
    <div className="Header__spacer" />
    {children}
  </header>
);

Header.propTypes = {
  title: PropTypes.string.isRequired,
};

export default Header;
