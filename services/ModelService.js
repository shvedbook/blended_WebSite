const fs = require('fs');
const util = require('util');

/**
 * We want to use async/await with fs.readFile - util.promisfy gives us that
 */
const readFile = util.promisify(fs.readFile);

/**
 * Logic for fetching models information
 */
class modelservice {
  /**
   * Constructor
   * @param {*} datafile Path to a JSOn file that contains the models data
   */
  constructor(datafile) {
    this.datafile = datafile;
  }

  /**
   * Returns a list of models name and short name
   */
  async getModelData() {
    const data = await this.getData();

    // We are using map() to transform the array we get into another one
    return data.map((model) => {
      return {
        id: model.id,
        name: model.name,
        picture: model.picture,
        Story: model.Story,
        experts: model.experts,
        case_studies: model.case_studies,
      };
    });
  }

  /**
   * Get all artwork
   */
  async getAllArtwork() {
    const data = await this.getData();

    // Array.reduce() is used to traverse all models and
    // create an array that contains all artwork
    const artwork = data.reduce((acc, elm) => {
      if (elm.artwork) {
        // eslint-disable-next-line no-param-reassign
        acc = [...acc, ...elm.artwork];
      }
      return acc;
    }, []);
    return artwork;
  }

  /**
   * Get all artwork of a given model
   * @param {*} shortname The models short name
   */
  async getArtworkFormodel(shortname) {
    const data = await this.getData();
    const model = data.find((elm) => {
      return elm.shortname === shortname;
    });
    if (!model || !model.artwork) return null;
    return model.artwork;
  }

  /**
   * Get model information provided a shortname
   * @param {*} shortname
   */
  async getmodel(shortname) {
    const data = await this.getData();
    const model = data.find((elm) => {
      return elm.shortname === shortname;
    });
    if (!model) return null;
    return {
      title: model.title,
      name: model.name,
      shortname: model.shortname,
      description: model.description,
    };
  }

  /**
   * Returns a list of models with only the basic information
   */
  async getListShort() {
    const data = await this.getData();
    return data.map((model) => {
      return {
        name: model.name,
        shortname: model.shortname,
        title: model.title,
      };
    });
  }

  /**
   * Get a list of models
   */
  async getList() {
    const data = await this.getData();
    return data.map((model) => {
      return {
        name: model.name,
        shortname: model.shortname,
        title: model.title,
        summary: model.summary,
      };
    });
  }

  /**
   * Fetches models data from the JSON file provided to the constructor
   */
  async getData() {
    const data = await readFile(this.datafile, 'utf8');
    return JSON.parse(data).models;
  }
}

module.exports = modelservice;
