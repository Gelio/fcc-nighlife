class Bar {
  /**
   * Creates an instance of Bar.
   * @param {any} id
   * @param {string} name
   * @param {string} description
   * @param {{ lat: number, lng: number }} location
   * @memberof Bar
   */
  constructor(id, name, description, location) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.location = location;
  }
}

export default Bar;
