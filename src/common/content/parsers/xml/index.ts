import xml from 'xml2js';

export default class XML {
  options;
  constructor(options = {}) {
    this.options = options;
  }

  /**
   * Converts xml document to its JSON structure.
   * @param {string} file - xml file
   * @return {Object}
   */
  async toJSON(file) {
    const body = await xml.parseStringPromise(file, this.options);

    return {
      body,
    };
  }
}
