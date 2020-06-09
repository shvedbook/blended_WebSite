const fs = require('fs');
const util = require('util');

/**
 * We want to use async/await with fs.readFile - util.promisfy gives us that
 */
const readFile = util.promisify(fs.readFile);

/**
 * Logic for fetching exprets information
 */
class expretservice {
  /**
   * Constructor
   * @param {*} datafile Path to a JSOn file that contains the exprets data
   */
  constructor(datafile) {
    this.datafile = datafile;
  }

  /**
   * Returns a list of exprets name and short name
   */
  async getExpertData() {
    const data = await this.getData();

    // We are using map() to transform the array we get into another one
    return data.map((expret) => {
      return {
        id: expret.id,
        name: expret.name,
        picture: expret.picture,
        experience: expret.experience,
        education: expret.education,
        shortStory: expret.shortStory,
        longStory: expret.longStory,
      };
    });
  }

  /**
   * Get all artwork
   */
  async getAllArtwork() {
    const data = await this.getData();

    // Array.reduce() is used to traverse all exprets and
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
   * Get all artwork of a given expret
   * @param {*} shortname The exprets short name
   */
  async getArtworkForexpret(shortname) {
    const data = await this.getData();
    const expret = data.find((elm) => {
      return elm.shortname === shortname;
    });
    if (!expret || !expret.artwork) return null;
    return expret.artwork;
  }

  /**
   * Get expret information provided a shortname
   * @param {*} shortname
   */
  async getexpret(shortname) {
    const data = await this.getData();
    const expret = data.find((elm) => {
      return elm.shortname === shortname;
    });
    if (!expret) return null;
    return {
      title: expret.title,
      name: expret.name,
      shortname: expret.shortname,
      description: expret.description,
    };
  }

  /**
   * Returns a list of exprets with only the basic information
   */
  async getListShort() {
    const data = await this.getData();
    return data.map((expret) => {
      return {
        name: expret.name,
        shortname: expret.shortname,
        title: expret.title,
      };
    });
  }

  /**
   * Get a list of exprets
   */
  async getList() {
    const data = await this.getData();
    return data.map((expret) => {
      return {
        name: expret.name,
        shortname: expret.shortname,
        title: expret.title,
        summary: expret.summary,
      };
    });
  }

  /**
   * Fetches exprets data from the JSON file provided to the constructor
   */
  async getData() {
    const data = await readFile(this.datafile, 'utf8');
    return JSON.parse(data).exprets;
  }
}

module.exports = expretservice;
