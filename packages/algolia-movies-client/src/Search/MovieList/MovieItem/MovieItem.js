import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import classnames from "classnames/dedupe";
import { pure } from "recompose";
import DeleteIcon from "react-icons/lib/md/delete";

import Button from "../../../common/Button";
import Chip from "../../../common/Chip";
import Rating from "../../../common/Rating";
import "./MovieItem.css";

const EMPTY_ARRAY = [];

class MovieItem extends PureComponent {
  state = { hovered: false };

  _handleMouseEnter = () => this.setState({ hovered: true });
  _handleMouseLeave = () => this.setState({ hovered: false });
  _handleDeleteClicked = () => this.props.onDeleteClicked(this.props.movie.objectID);

  render = () => {
    const { movie } = this.props;
    const { hovered } = this.state;
    return (
      <div
        className="MovieItem"
        onMouseEnter={this._handleMouseEnter}
        onMouseLeave={this._handleMouseLeave}>
        <div className="MovieItem__poster" style={{ backgroundImage: `url(${movie.image})` }} />
        <div
          className={classnames("MovieItem__actions", { "MovieItem__actions--hidden": !hovered })}>
          <Button onClick={this._handleDeleteClicked} color="#f00">
            <DeleteIcon />
          </Button>
        </div>
        <div className="MovieItem__description">
          <span
            className="MovieItem__title"
            dangerouslySetInnerHTML={{
              __html: movie._highlightResult.title.value,
            }}
          />
          <Rating className="MovieItem__rating" value={movie.rating} />
          <span className="MovieItem__year">{movie.year}</span>
          <ul className="MovieItem__genres">
            {/* NB: Genre can be an empty array. And when it is, it doesn't appear at all in _highlightResult !*/}
            {(movie._highlightResult.genre || EMPTY_ARRAY).map(genre => (
              <li className="MovieItem__genre" key={genre.value}>
                <Chip>
                  <span
                    dangerouslySetInnerHTML={{
                      __html: genre.value,
                    }}
                  />
                </Chip>
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
  };
}

MovieItem.propTypes = {
  movie: PropTypes.object.isRequired,
  onDeleteClicked: PropTypes.func.isRequired,
};

export default pure(MovieItem);
