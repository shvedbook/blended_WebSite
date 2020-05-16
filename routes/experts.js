const express = require('express');

const router = express.Router();

module.exports = (params) => {
  const { expertsService } = params;
  router.get('/', (request, response) => {
    response.render('layout', { pageTitle: 'מומחי תוכן', template: 'experts' });
  });

  router.get('/', async (request, response) => {
    const experts = await expertsService.getList();
    return response.json(experts);
  });
  router.get('/:expertID', (request, response) => {
    return response.send(`detail page of ${request.params.expertID}`);
  });
  router.post('/', (request, response) => {
    return response.send('Feedback form posted');
  });
  return router;
};
