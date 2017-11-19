import React, { PureComponent } from "react";
import ChipsInput from "react-chips";
import { toast } from "react-toastify";

import moviesService from "../movies.service";
import Card from "../common/Card";
import Button from "../common/Button";
import Rating from "../common/Rating";
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
        newValue = parseInt(changeObj.target.value, 10);
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
    });
  };

  _loadSuggestions = () => {
    moviesService.getSuggestions().then(suggestions => {
      this.setState({ suggestions });
    });
  };

  _handleMovieCreation = e => {
    e.preventDefault();
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

  render = () => {
    const { movie, suggestions } = this.state;
    return (
      <div className="MovieCreation">
        <Card>
          <form className="MovieCreation__form" onSubmit={this._handleMovieCreation}>
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
                name="alternative_titles"
                id="alternative_titles"
                placeholder="Alternative titles"
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
              <div>
                <input
                  className="MovieCreation__input"
                  type="range"
                  name="rating"
                  id="rating"
                  min="0"
                  max="5"
                  value={movie.rating}
                  onChange={this._handleFieldChange("rating", NUMBER)}
                />
                <Rating value={movie.rating} />
              </div>
            </label>
            {/* Genres */}
            <label className="MovieCreation__field" htmlFor="genre">
              Genres
              <ChipsInput
                className="MovieCreation__input"
                name="genre"
                id="genre"
                placeholder="Genres"
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
                className="MovieCreation__input"
                name="actors"
                id="actors"
                placeholder="Actors"
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
              <Button> Cancel </Button>
              <Button type="submit"> Create </Button>
            </div>
          </form>
        </Card>
      </div>
    );
  };
}

export default MovieCreation;
