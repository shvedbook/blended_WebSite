const express = require('express');

const modelsRoute = require('./models');
const toolsRoute = require('./tools');

const router = express.Router();

module.exports = (params) => {
  router.get('/', (request, response) => {
    response.render('layout', { pageTitle: 'מה הבלמדד שלך?', template: 'index' });
  });

  router.use('/models', modelsRoute(params));
  router.use('/tools', toolsRoute(params));

  return router;
};
