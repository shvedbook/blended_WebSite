const express = require('express');

const router = express.Router();

module.exports = () => {
  router.get('/', (request, response) => {
    response.render('layout', { pageTitle: 'get all data', template: 'getmydata' });
  });
  /*router.get('/:toolID', (request, response) => {
    return response.send(`detail page of ${request.params.toolID}`);
  });*/

  return router;
};
