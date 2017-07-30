import React, { Component } from 'react';

import SearchBox from './search-box/SearchBox';
import BarRowContainer from './bar-row/BarRowContainer';
import Bar from './bar';

import GoogleMaps from '../google-maps.facade';
import AttendanceService from '../attendance.service';
import AuthService from '../authentication/auth.service';

import './BarList.css';

class BarList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      bars: [],
      isFetching: false,
      error: null,
      attendedBars: {},
      isGeolocationEnabled: 'geolocation' in navigator,
    };

    this.authUnsub = AuthService.getAuth().onAuthStateChanged(() => {
      this.updateAttendance();
      this.forceUpdate();
    });

    this.beginSearch = this.beginSearch.bind(this);
    this.toggleAttendance = this.toggleAttendance.bind(this);
    this.searchUsingGeolocation = this.searchUsingGeolocation.bind(this);
  }

  componentWillUnmount() {
    this.authUnsub();
  }

  /**
   * @param {{ lat: number, lng: number }} location
   */
  async searchAtLocation(location) {
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
    this.updateAttendance(bars);

    this.setState({
      isFetching: false,
      bars,
    });

    return true;
  }

  async updateAttendance(bars = this.state.bars) {
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
      attendedBars,
    });
  }

  /**
   * @param {string} address
   */
  async beginSearch(address) {
    this.setState({ isFetching: true, error: null, bars: [] });

    let location;
    try {
      location = await GoogleMaps.getGeocode(address);
    } catch (error) {
      return this.setState({ isFetching: false, error });
    }

    return this.searchAtLocation(location);
  }

  searchUsingGeolocation() {
    navigator.geolocation.getCurrentPosition((position) => {
      this.searchAtLocation({
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      });
    });
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
    const { bars, error, isFetching, attendedBars, isGeolocationEnabled } = this.state;
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
        <SearchBox search={this.beginSearch} disabled={isFetching} />
        {isGeolocationEnabled &&
          <div className="geolocation-button-wrapper">
            <button className="geolocation-button" onClick={this.searchUsingGeolocation}>
              Use current location
            </button>
          </div>}
        <div className="bar-list-wrapper container">
          <h2>Bars near you</h2>
          {content}
        </div>
      </div>
    );
  }
}

export default BarList;
