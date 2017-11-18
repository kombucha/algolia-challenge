import React from "react";
import PropTypes from "prop-types";
import classnames from "classnames/dedupe";
import { generatePagesWindow } from "./utils";

import Card from "../Card";
import "./Pagination.css";

const Pagination = ({ className, currentPage, onPageChange, totalPages }) => {
  const hasPrevious = currentPage > 0;
  const hasNext = currentPage < totalPages - 1;
  return (
    <Card className={classnames("Pagination", className)} fullBleed>
      <nav>
        <ul className="Pagination__list">
          <li className="Pagination__item">
            <button
              className="Pagination__button"
              disabled={!hasPrevious}
              onClick={() => onPageChange(0)}>
              &lt;&lt;
            </button>
          </li>
          <li className="Pagination__item">
            <button
              className="Pagination__button"
              disabled={!hasPrevious}
              onClick={() => onPageChange(currentPage - 1)}>
              &lt;
            </button>
          </li>

          {generatePagesWindow(currentPage, totalPages).map(page => (
            <li className="Pagination__item" key={page}>
              <button
                className={classnames("Pagination__button", {
                  "Pagination__button--current": page === currentPage,
                })}
                onClick={() => onPageChange(page)}>
                {page + 1}
              </button>
            </li>
          ))}

          <li className="Pagination__item">
            <button
              className="Pagination__button"
              disabled={!hasNext}
              onClick={() => onPageChange(currentPage + 1)}>
              &gt;
            </button>
          </li>
          <li className="Pagination__item">
            <button
              className="Pagination__button"
              disabled={!hasNext}
              onClick={() => onPageChange(totalPages - 1)}>
              &gt;&gt;
            </button>
          </li>
        </ul>
      </nav>
    </Card>
  );
};

Pagination.propTypes = {
  className: PropTypes.string,
  currentPage: PropTypes.number.isRequired,
  totalPages: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
};

export default Pagination;
