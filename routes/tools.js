const express = require('express');

const router = express.Router();

module.exports = () => {
  router.get('/', (request, response) => {
    response.render('layout', { pageTitle: 'כלים', template: 'tools' });
  });
  router.get('/:toolID', (request, response) => {
    return response.send(`detail page of ${request.params.toolID}`);
  });
  router.post('/', (request, response) => {
    return response.send('Feedback form posted');
  });
  return router;
};
