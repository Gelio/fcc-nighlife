/* globals google */

const geocoders = new WeakMap();
const services = new WeakMap();

class GoogleMapsFacade {
  constructor() {
    const geocoder = new google.maps.Geocoder();
    geocoders.set(this, geocoder);

    const placesService = new google.maps.places.PlacesService(
      document.createElement('div'),
    );
    services.set(this, placesService);
  }

  /**
   * Gets the geocode of an address
   * @param {string} address
   * @returns {Promise<{lat: number, lng: number}>}
   * @memberof GoogleMapsFacade
   */
  getGeocode(address) {
    return new Promise((resolve, reject) => {
      geocoders.get(this).geocode({
        address,
      }, (results, status) => {
        if (status !== google.maps.places.PlacesServiceStatus.OK) {
          return reject(status);
        }

        if (results.length === 0) {
          return reject('No place found');
        }

        return resolve(results[0].geometry.location.toJSON());
      });
    });
  }

  /**
   * Returns the list of nearby bars
   * @param {{lat: number, lng: number}} location
   * @param {string} type
   * @returns
   * @memberof GoogleMapsFacade
   */
  getPlaces(location, type) {
    return new Promise((resolve, reject) => {
      services.get(this).nearbySearch({
        location,
        radius: '500',
        type: [type],
      }, (results, status) => {
        if (status !== google.maps.places.PlacesServiceStatus.OK) {
          return reject(status);
        }

        return resolve(results);
      });
    });
  }
}

export default new GoogleMapsFacade();
