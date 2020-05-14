const express = require('express');

const router = express.Router();

module.exports = () => {
  router.get('/', (request, response) => {
    return response.send('Models List');
  });
  router.get('/:modelName', (request, response) => {
    return response.send(`detail page of ${request.params.modelName}`);
  });
  router.post('/', (request, response) => {
    return response.send('Feedback form posted');
  });
  return router;
};
