const express = require('express');

const casestudyRoute = require('./casestudy');
const expertsRoute = require('./experts');
const modelsRoute = require('./models');
const toolsRoute = require('./tools');
const feedbackRoute = require('./feedback');

const router = express.Router();

module.exports = (params) => {
  router.get('/', (request, response) => {
    response.render('layout', { pageTitle: 'מְעַרְבְּבִים', template: 'index' });
  });

  router.use('/casestudy', casestudyRoute(params));
  router.use('/experts', expertsRoute(params));
  router.use('/models', modelsRoute(params));
  router.use('/tools', toolsRoute(params));
  router.use('/feedback', feedbackRoute(params));

  return router;
};
