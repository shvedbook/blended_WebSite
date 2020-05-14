const express = require('express');

const router = express.Router();

module.exports = () => {
  router.get('/', (request, response) => {
    return response.send('Expert List');
  });
  router.get('/:expertID', (request, response) => {
    return response.send(`detail page of ${request.params.expertID}`);
  });
  router.post('/', (request, response) => {
    return response.send('Feedback form posted');
  });
  return router;
};
