const express = require('express');

const router = express.Router();

module.exports = () => {
  router.get('/', (request, response) => {
    response.render('layout', { pageTitle: 'מקרי בוחן', template: 'casestudy' });
  });
  router.get('/:casestudyID', (request, response) => {
    return response.send(`detail page of ${request.params.casetudyID}`);
  });
  router.post('/', (request, response) => {
    return response.send('Feedback form posted');
  });
  return router;
};
