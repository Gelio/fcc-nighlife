import React, {
  Component
} from 'react';

import SearchBox from './search-box/SearchBox';
import BarRow from './bar-row/BarRow';
import Bar from './bar';

import googleMaps from '../google-maps';

import './BarList.css';

class BarList extends Component {
  constructor() {
    super();

    this.state = {
      bars: [new Bar(1, 'Bar a', 'description'), new Bar(2, 'Bar b', 'description')],
    };

    this.beginSearch = this.beginSearch.bind(this);
  }

  beginSearch(address) {
    console.log('searching near', address);

    console.log(googleMaps);
    this.getGeocode(address);
  }

  getGeocode(address) {
    googleMaps.geocode({
      address,
    }, (err, response) => {
      const formattedAddress = response.json.results[0].formatted_address;
      const location = response.json.results[0].geometry.location;
      debugger;

      this.setState({
        formattedAddress,
      });
      this.getPlaces(location);
    });
  }

  getPlaces(location) {
    googleMaps.places({
      location,
      type: 'bar',
    }, (err, response) => {
      console.log(response);
      debugger;
    });
  }

  render() {
    let content = < span > No bars found.Please enter your location above and press Search. < /span>;
    if (this.state.bars.length > 0) {
      content = ( <
        ul className = "bar-list" > {
          this.state.bars.map(bar =>
            ( < li key = {
                bar.id
              } >
              <
              BarRow bar = {
                bar
              }
              /> < /
              li > ),
          )
        } <
        /ul>
      );
    }

    return ( <
      div >
      <
      SearchBox search = {
        this.beginSearch
      }
      /> <
      div className = "bar-list-wrapper container" >
      <
      h2 > Bars near you < /h2>

      {
        content
      } <
      /div> < /
      div >
    );
  }
}

export default BarList;
