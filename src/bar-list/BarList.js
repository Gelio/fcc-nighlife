import React, { Component } from 'react';

import SearchBox from './search-box/SearchBox';
import BarRow from './bar-row/BarRow';
import Bar from './bar';

import GoogleMaps from '../google-maps.facade';

import './BarList.css';

class BarList extends Component {
  constructor() {
    super();

    this.state = {
      bars: [],
      isFetching: false,
      error: null,
    };

    this.beginSearch = this.beginSearch.bind(this);
  }

  async beginSearch(address) {
    this.setState({ isFetching: true, error: null, bars: [] });

    let location;
    try {
      location = await GoogleMaps.getGeocode(address);
    } catch (error) {
      return this.setState({ isFetching: false, error });
    }

    let nearbyPlaces;
    try {
      nearbyPlaces = await GoogleMaps.getPlaces(location, 'bar');
    } catch (error) {
      return this.setState({ isFetching: false, error });
    }
    this.setState({
      isFetching: false,
      bars: nearbyPlaces.map(
        place =>
          new Bar(
            place.place_id,
            `${place.name} (${place.rating})`,
            place.vicinity,
            place.geometry.location.toJSON(),
          ),
      ),
    });

    return true;
  }

  render() {
    const { bars, error, isFetching } = this.state;
    let content = (
      <span> Please enter your location above and press Search. </span>
    );

    if (!isFetching && bars.length > 0) {
      content = (
        <ul className="bar-list">
          {bars.map(bar => <BarRow key={bar.id} bar={bar} />)}
        </ul>
      );
    }

    if (isFetching) {
      content = <div>Loading...</div>;
    }

    if (error) {
      content = <div>Request error.</div>;
    }

    return (
      <div>
        <SearchBox search={this.beginSearch} disabled={isFetching} />{' '}
        <div className="bar-list-wrapper container">
          <h2> Bars near you </h2>
          {content}{' '}
        </div>{' '}
      </div>
    );
  }
}

export default BarList;
