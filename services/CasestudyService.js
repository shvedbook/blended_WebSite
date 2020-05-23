const fs = require('fs');
const util = require('util');

/**
 * We want to use async/await with fs.readFile - util.promisfy gives us that
 */
const readFile = util.promisify(fs.readFile);

/**
 * Logic for fetching casestudys information
 */
class casestudyservice {
  /**
   * Constructor
   * @param {*} datafile Path to a JSOn file that contains the casestudys data
   */
  constructor(datafile) {
    this.datafile = datafile;
  }

  /**
   * Returns a list of casestudys name and short name
   */
  async getCSData() {
    const data = await this.getData();

    // We are using map() to transform the array we get into another one
    return data.map((casestudy) => {
      return {
        id: casestudy.id,
        name: casestudy.name,
        picture: casestudy.picture,
        experience: casestudy.experience,
        education: casestudy.education,
        shortStory: casestudy.shortStory,
        longStory: casestudy.longStory,
        casestudys: casestudy.casestudys,
        case_studies: casestudy.case_studies,
      };
    });
  }

  /**
   * Get all artwork
   */
  async getAllArtwork() {
    const data = await this.getData();

    // Array.reduce() is used to traverse all casestudys and
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
   * Get all artwork of a given casestudy
   * @param {*} shortname The casestudys short name
   */
  async getArtworkForcasestudy(shortname) {
    const data = await this.getData();
    const casestudy = data.find((elm) => {
      return elm.shortname === shortname;
    });
    if (!casestudy || !casestudy.artwork) return null;
    return casestudy.artwork;
  }

  /**
   * Get casestudy information provided a shortname
   * @param {*} shortname
   */
  async getcasestudy(shortname) {
    const data = await this.getData();
    const casestudy = data.find((elm) => {
      return elm.shortname === shortname;
    });
    if (!casestudy) return null;
    return {
      title: casestudy.title,
      name: casestudy.name,
      shortname: casestudy.shortname,
      description: casestudy.description,
    };
  }

  /**
   * Returns a list of casestudys with only the basic information
   */
  async getListShort() {
    const data = await this.getData();
    return data.map((casestudy) => {
      return {
        name: casestudy.name,
        shortname: casestudy.shortname,
        title: casestudy.title,
      };
    });
  }

  /**
   * Get a list of casestudys
   */
  async getList() {
    const data = await this.getData();
    return data.map((casestudy) => {
      return {
        name: casestudy.name,
        shortname: casestudy.shortname,
        title: casestudy.title,
        summary: casestudy.summary,
      };
    });
  }

  /**
   * Fetches casestudys data from the JSON file provided to the constructor
   */
  async getData() {
    const data = await readFile(this.datafile, 'utf8');
    return JSON.parse(data).casestudys;
  }
}

module.exports = casestudyservice;
