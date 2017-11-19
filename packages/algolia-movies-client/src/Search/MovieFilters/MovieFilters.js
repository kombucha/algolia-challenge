import React, { PureComponent } from "react";
import PropTypes from "prop-types";

import { clearFacetFilter } from "./utils";
import GenreFacet from "./GenreFacet";
import RatingFilter from "./RatingFilter";
import "./MovieFilters.css";

class MovieFilters extends PureComponent {
  _handleFacetClicked = facetName => facetValue => {
    const { filters } = this.props;
    const facet = filters[facetName];
    const config = facet[facetValue];
    const updatedFacet = {
      ...facet,
      [facetValue]: { ...config, selected: !config.selected },
    };

    this.props.onChange({ ...filters, [facetName]: updatedFacet });
  };

  _handleRatingChanged = rating => {
    const { filters } = this.props;
    this.props.onChange({ ...filters, rating });
  };

  _handleFacetClear = facetName => () => {
    const { filters } = this.props;
    this.props.onChange({
      ...filters,
      [facetName]: clearFacetFilter(filters[facetName]),
    });
  };

  render = () => {
    const { filters } = this.props;
    return (
      <div className="MovieFilters">
        <RatingFilter minRating={filters.rating} onRatingChanged={this._handleRatingChanged} />
        <GenreFacet
          genres={filters.genre}
          onGenreClicked={this._handleFacetClicked("genre")}
          onClearClicked={this._handleFacetClear("genre")}
        />
      </div>
    );
  };
}

MovieFilters.propTypes = {
  filters: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default MovieFilters;
