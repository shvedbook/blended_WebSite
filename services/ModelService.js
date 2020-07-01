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
        experience: model.experience,
        education: model.education,
        Story: model.Story,
        longStory: model.longStory,
        models: model.models,
        experts: [
          model.experts[0].id,
          model.experts[0].name,
          model.experts[0].education,
          model.experts[0].longStory,
          model.experts[0].media,
        ],
        case_studies: [
          model.case_studies[0].name,
          model.case_studies[0].story,
          model.case_studies[0].media,
        ],
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
   * @param {*} id The models short name
   */
  async getArtworkFormodel(id) {
    const data = await this.getData();
    const model = data.find((elm) => {
      return elm.id === id;
    });
    if (!model || !model.artwork) return null;
    return model.artwork;
  }

  /**
   * Get model information provided a id
   * @param {*} id
   */
  async getModel(id) {
    const data = await this.getData();
    const modeldata = data.find((elm) => {
      return elm.id === id;
    });
    if (!modeldata) return null;
    return {
      modelid: modeldata.id,
      modelname: modeldata.name,
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
        id: model.id,
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
        id: model.id,
        name: model.name,
        picture: model.picture,
        experience: model.experience,
        education: model.education,
        Story: model.Story,
        longStory: model.longStory,
        models: model.models,
        experts: [
          model.experts[0].id,
          model.experts[0].name,
          model.experts[0].education,
          model.experts[0].longStory,
          model.experts[0].media,
        ],
        case_studies: [
          model.case_studies[0].name,
          model.case_studies[0].story,
          model.case_studies[0].media,
        ],
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
