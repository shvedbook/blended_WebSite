const express = require('express');

const router = express.Router();

module.exports = (params) => {
  const { modelsService } = params;

  router.get('/', async (request, response) => {
    const models = await modelsService.getList();
    response.render('layout', { pageTitle: 'מומחי תוכן', template: 'models', models });
    //return response.json(models);
  });
  router.get('/:modelName', (request, response) => {
    return response.send(`detail page of ${request.params.modelName}`);
  });
  router.post('/', (request, response) => {
    return response.send('Feedback form posted');
  });
  return router;
};
