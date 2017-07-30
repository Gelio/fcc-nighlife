class Bar {
  /**
   * Creates an instance of Bar.
   * @param {any} id
   * @param {string} name
   * @param {string} description
   * @param {{ lat: number, lng: number }} location
   * @param {number} rating
   * @memberof Bar
   */
  constructor(id, name, description, location, rating) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.location = location;
    this.rating = rating;
  }
}

export default Bar;
