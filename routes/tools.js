const express = require('express');

const router = express.Router();

module.exports = () => {
  router.get('/', (request, response) => {
    return response.send('Tools List');
  });
  router.get('/:toolID', (request, response) => {
    return response.send(`detail page of ${request.params.toolID}`);
  });
  router.post('/', (request, response) => {
    return response.send('Feedback form posted');
  });
  return router;
};
