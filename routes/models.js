const express = require('express');

const router = express.Router();

module.exports = () => {
  router.get('/', (request, response) => {
    response.render('layout', { pageTitle: 'מודלים', template: 'models' });
  });
  router.get('/:modelName', (request, response) => {
    return response.send(`detail page of ${request.params.modelName}`);
  });
  router.post('/', (request, response) => {
    return response.send('Feedback form posted');
  });
  return router;
};
