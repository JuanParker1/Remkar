import * as yaml from 'js-yaml';

export default class YAML {
  options;
  constructor(options = {}) {
    this.options = options;
  }

  /**
   * Converts yaml document to its JSON structure.
   * @param {string} file - Yaml file
   * @return {Object}
   */
  toJSON(file) {
    return yaml.load(file, { ...this.options, json: true });
  }
}
