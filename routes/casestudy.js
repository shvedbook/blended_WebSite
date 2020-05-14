const express = require('express');

const router = express.Router();

module.exports = () => {
  router.get('/', (request, response) => {
    return response.send('Cases List');
  });
  router.get('/:casestudyID', (request, response) => {
    return response.send(`detail page of ${request.params.casetudyID}`);
  });
  router.post('/', (request, response) => {
    return response.send('Feedback form posted');
  });
  return router;
};
