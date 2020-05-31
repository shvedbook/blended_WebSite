const express = require('express');

const router = express.Router();

module.exports = (params) => {
  const { modelService } = params;

  router.get('/', async (request, response) => {
    const models = await modelService.getList();
    response.render('layout', { pageTitle: 'מודלים', template: 'models', models });
    //return response.json(models);
  });
  router.get('/:id', async (request, response) => {
    const model = await modelService.getModel(request.params.id);
    response.render('layout', { pageTitle: 'מודלים', template: 'model', model });
    //return response.json(models);
  });

  return router;
};
