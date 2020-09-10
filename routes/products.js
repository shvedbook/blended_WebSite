const express = require('express');
const { check, validationResult } = require('express-validator');
const { request, response } = require('express');

const router = express.Router();

module.exports = (params) => {
  const { modelsService } = params;

  router.get('/', async (request, response, next) => {
    try {
      const errors = request.session.feedback ? request.session.feedback.errors : false;
      const successMessage = request.session.feedback ? request.session.feedback.message : false;

      request.session.feedback = {};

      return response.render('layout', {
        pageTitle: 'משאבי למידה ותוצרים',
        template: 'products',

        errors,
        successMessage,
      });
    } catch (err) {
      return next();
    }
  });

  /*router.get('/:id', async (request, response) => {
    const model = await modelsService.getModel(request.params.id);
    console.log(model);

    return response.render('layout', {
      pageTitle: 'מודלים',
      template: 'model-details',
      model,
    });
  });*/

  return router;
};
