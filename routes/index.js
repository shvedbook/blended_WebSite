const express = require('express');

const casestudyRoute = require('./casestudy');
const expertsRoute = require('./experts');
const modelsRoute = require('./models');
const toolsRoute = require('./tools');

const router = express.Router();

module.exports = () => {
  router.get('/', (request, response) => {
    response.render('pages/index', { pageTitle: 'מְעַרְבְּבִים' });
  });

  router.use('/casestudy', casestudyRoute());
  router.use('/experts', expertsRoute());
  router.use('/models', modelsRoute());
  router.use('/tools', toolsRoute());

  return router;
};
