const express = require('express');

const router = express.Router();

module.exports = (params) => {
  const { modelService } = params;

  router.get('/', async (request, response) => {
    const models = await modelService.getList();
    response.render('layout', { pageTitle: 'מודלים', template: 'models', models });
    //return response.json(models);
  });

  return router;
};
