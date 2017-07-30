import React, { Component } from 'react';

import SearchBox from './search-box/SearchBox';
import BarRowContainer from './bar-row/BarRowContainer';
import Bar from './bar';

import GoogleMaps from '../google-maps.facade';
import AttendanceService from '../attendance.service';
import AuthService from '../authentication/auth.service';

import './BarList.css';

class BarList extends Component {
  constructor() {
    super();

    this.state = {
      bars: [],
      isFetching: false,
      error: null,
      attendedBars: {},
    };

    this.beginSearch = this.beginSearch.bind(this);
    this.toggleAttendance = this.toggleAttendance.bind(this);
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
    const bars = nearbyPlaces.map(
      place =>
        new Bar(
          place.place_id,
          place.name,
          place.vicinity,
          place.geometry.location.toJSON(),
          place.rating,
        ),
    );
    const attendedBars = {};
    if (AuthService.isAuthenticated()) {
      const userId = AuthService.getUser().uid;
      const date = new Date();

      await Promise.all(
        bars.map(async (bar) => {
          const isAttending = await AttendanceService.isUserAttending(userId, bar, date);
          attendedBars[bar.id] = isAttending;
        }),
      );
    }

    this.setState({
      isFetching: false,
      bars,
      attendedBars,
    });

    return true;
  }

  /**
   * @param {Bar} bar
   */
  async toggleAttendance(bar) {
    await AttendanceService.toggleAttendance(bar, new Date());

    this.setState({
      attendedBars: Object.assign({}, this.state.attendedBars, {
        [bar.id]: !this.state.attendedBars[bar.id],
      }),
    });
  }

  render() {
    const { bars, error, isFetching, attendedBars } = this.state;
    let content = <span> Please enter your location above and press Search. </span>;

    if (!isFetching && bars.length > 0) {
      content = (
        <ul className="bar-list">
          {bars.map(bar =>
            (<BarRowContainer
              key={bar.id}
              bar={bar}
              toggleAttendance={this.toggleAttendance}
              isAttending={!!attendedBars[bar.id]}
            />),
          )}
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
