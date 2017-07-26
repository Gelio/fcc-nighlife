import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './SearchBox.css';

class SearchBox extends Component {
  constructor() {
    super();

    this.state = {
      location: '',
      buttonLifted: false,
    };
    this.onLocationChange = this.onLocationChange.bind(this);
    this.liftButton = this.liftButton.bind(this);
    this.lowerButton = this.lowerButton.bind(this);
    this.beginSearch = this.beginSearch.bind(this);
  }

  onLocationChange(e) {
    this.setState({
      location: e.target.value,
    });
  }

  liftButton() {
    this.setState({
      buttonLifted: true,
    });
  }

  lowerButton() {
    this.setState({
      buttonLifted: false,
    });
  }

  beginSearch(event) {
    event.preventDefault();
    this.lowerButton();
    this.props.search(this.state.location);
  }

  render() {
    const { location, buttonLifted } = this.state;
    const disabled = this.props.disabled;

    const buttonClassName = `search-box__button ${buttonLifted && !disabled
      ? 'lifted'
      : ''}`;

    return (
      <div className="container">
        <form noValidate>
          <div className="search-box__wrapper">
            <input
              type="text"
              className="search-box__field"
              placeholder="Enter your location"
              onChange={this.onLocationChange}
              value={location}
            />

            <button
              type="submit"
              className={buttonClassName}
              onMouseEnter={this.liftButton}
              onMouseLeave={this.lowerButton}
              onClick={this.beginSearch}
              disabled={disabled}
            >
              Search
            </button>
          </div>
        </form>
      </div>
    );
  }
}

SearchBox.propTypes = {
  search: PropTypes.func.isRequired,
  disabled: PropTypes.bool.isRequired,
};

export default SearchBox;
