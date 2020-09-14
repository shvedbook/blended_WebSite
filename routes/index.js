const express = require('express');

const modelsRoute = require('./models');
const toolsRoute = require('./tools');
const productsRoute = require('./products');
const getmydataRoute = require('./getmydata');
const router = express.Router();

module.exports = (params) => {
  try {
    router.get('/', (request, response, next) => {
      return response.render('layout', { pageTitle: 'מה הבלמדד שלך?', template: 'index' });
    });
  } catch (err) {
    return next(err);
  }

  router.use('/models', modelsRoute(params));
  router.use('/tools', toolsRoute(params));
  router.use('/products', productsRoute(params));
  router.use('/getmydata', getmydataRoute(params));

  return router;
};
