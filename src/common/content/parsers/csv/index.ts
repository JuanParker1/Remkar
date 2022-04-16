const csv = require('csvtojson');

export default class CSV {
  options;
  constructor(options = {}) {
    this.options = options;
  }

  /**
   * Converts csv document to its JSON structure.
   * @param {string} file - Csv file
   * @return {Object}
   */
  async toJSON(file) {
    const body = await csv({ output: 'json', ...this.options }).fromString(
      file,
    );

    return {
      body,
    };
  }
}
