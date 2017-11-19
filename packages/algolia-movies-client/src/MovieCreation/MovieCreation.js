import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import ChipsInput from "react-chips";
import { toast } from "react-toastify";
import { Prompt } from "react-router-dom";

import moviesService from "../movies.service";
import Card from "../common/Card";
import Button from "../common/Button";
import RatingSlider from "../common/RatingSlider";
import chipsInputTheme from "./chipsInputTheme";
import "./MovieCreation.css";

// Field types
const NUMBER = "NUMBER";
const STRING = "STRING";
const MULTI = "MULTI";
const FILE = "FILE";

const CHIP_KEYS = [9]; // create chips with tab

class MovieCreation extends PureComponent {
  state = {
    movie: {
      title: "",
      alternative_titles: [],
      year: new Date().getFullYear(),
      genre: [],
      actors: [],
      rating: 3,
      image: null,
    },
    suggestions: { actors: [], genres: [] },
    loading: false,
    dirty: false,
  };

  componentDidMount = () => {
    this._loadSuggestions();
  };

  // TODO: memoize handlers ?
  _handleFieldChange = (name, type) => changeObj => {
    const { movie } = this.state;
    let newValue;

    switch (type) {
      case NUMBER:
        newValue = changeObj.target.value !== "" ? parseInt(changeObj.target.value, 10) : "";
        break;
      case FILE:
        newValue = changeObj.target.files[0];
        break;
      case STRING:
        newValue = changeObj.target.value;
        break;
      case MULTI:
        newValue = changeObj;
        break;

      default:
        throw new Error(`Unhandled type: ${type}`);
    }

    this.setState({
      movie: {
        ...movie,
        [name]: newValue,
      },
      dirty: true,
    });
  };

  _loadSuggestions = () => {
    moviesService.getSuggestions().then(suggestions => {
      this.setState({ suggestions });
    });
  };

  _handlePreventSubmit = e => e.preventDefault();

  _handleMovieCreation = () => {
    this.setState({ loading: true });
    moviesService
      .create(this.state.movie)
      .then(() => {
        toast.success("Movie created");
      })
      .catch(() => {
        this.setState({ loading: false });
        toast.error("Failed to create movie");
      });
  };

  _handleCancel = () => {
    this.props.history.push("/");
  };

  render = () => {
    const { movie, suggestions, dirty } = this.state;
    const shouldDisableCreationButton = !dirty;

    return (
      <div className="MovieCreation">
        <Card>
          <form className="MovieCreation__form" onSubmit={this._handlePreventSubmit}>
            <h2> Movie creation </h2>
            {/* Title */}
            <label className="MovieCreation__field" htmlFor="title">
              Title *
              <input
                className="MovieCreation__input"
                type="text"
                name="title"
                id="title"
                placeholder="Movie title"
                onChange={this._handleFieldChange("title", STRING)}
                autoFocus
                required
                value={movie.title}
              />
            </label>
            {/* Alternative titles */}
            <label className="MovieCreation__field" htmlFor="alternative_titles">
              Alternative Titles
              <ChipsInput
                className="MovieCreation__input"
                theme={chipsInputTheme}
                name="alternative_titles"
                id="alternative_titles"
                placeholder={movie.alternative_titles.length === 0 ? "Alternative titles" : null}
                onChange={this._handleFieldChange("alternative_titles", MULTI)}
                createChipKeys={CHIP_KEYS}
                value={movie.alternative_titles}
              />
            </label>
            {/* Release year */}
            <label className="MovieCreation__field" htmlFor="year">
              Release year *
              <input
                className="MovieCreation__input"
                type="number"
                name="year"
                id="year"
                placeholder="Release year"
                min="1800"
                value={movie.year}
                onChange={this._handleFieldChange("year", NUMBER)}
                required
              />
            </label>
            {/* Rating */}
            <label className="MovieCreation__field" htmlFor="rating">
              Rating
              <RatingSlider
                id="rating"
                name="rating"
                className="MovieCreation__input"
                value={movie.rating}
                onChange={this._handleFieldChange("rating", NUMBER)}
              />
            </label>
            {/* Genres */}
            <label className="MovieCreation__field" htmlFor="genre">
              Genres
              <ChipsInput
                theme={chipsInputTheme}
                className="MovieCreation__input"
                name="genre"
                id="genre"
                placeholder={movie.genre.length === 0 ? "Genres" : null}
                suggestions={suggestions.genres}
                createChipKeys={CHIP_KEYS}
                value={movie.genre}
                alwaysRenderSuggestions
                onChange={this._handleFieldChange("genre", MULTI)}
              />
            </label>
            {/* Actors */}
            <label className="MovieCreation__field" htmlFor="actors">
              Actors
              <ChipsInput
                theme={chipsInputTheme}
                className="MovieCreation__input"
                name="actors"
                id="actors"
                placeholder={movie.actors.length === 0 ? "Actors" : null}
                suggestions={suggestions.actors}
                createChipKeys={CHIP_KEYS}
                value={movie.actors}
                onChange={this._handleFieldChange("actors", MULTI)}
              />
            </label>
            {/* Movie poster */}
            <label className="MovieCreation__field" htmlFor="image">
              Movie poster *
              <input
                className="MovieCreation__input"
                type="file"
                name="image"
                id="image"
                onChange={this._handleFieldChange("image", FILE)}
                accept=".png,.jpg"
                multiple={false}
                required
              />
            </label>
            <div className="MovieCreation__actions">
              <Button color="#f00" onClick={this._handleCancel}>
                {" "}
                Cancel{" "}
              </Button>
              <Button
                type="submit"
                disabled={shouldDisableCreationButton}
                onClick={this._handleMovieCreation}>
                Create
              </Button>
            </div>
          </form>
        </Card>

        <Prompt when={dirty} message="Are you sure you want to leave and lose your work so far ?" />
      </div>
    );
  };
}

MovieCreation.propTypes = {
  history: PropTypes.object.isRequired,
};

export default MovieCreation;
