const express = require('express');
const { check, validationResult } = require('express-validator');
const { request, response } = require('express');
const validations = [
  check('name').trim().isLength({ min: 3, max: 25 }).escape().withMessage('השם לא תקין'),
  check('email').trim().isEmail().normalizeEmail().withMessage('כתובת המייל לא תקינה'),
  check('title').trim().isLength({ min: 3, max: 45 }).escape().withMessage('הכותרת לא תקינה'),
  check('message').trim().isLength({ min: 3, max: 80 }).escape().withMessage('גוף ההודעה לא תקין'),
];
const router = express.Router();

module.exports = (params) => {
  const { modelsService } = params;
  const { feedbackService } = params;

  router.get('/', async (request, response) => {
    const errors = request.session.feedback ? request.session.feedback.errors : false;
    const successMessage = request.session.feedback ? request.session.feedback.message : false;

    request.session.feedback = {};

    return response.render('layout', {
      pageTitle: 'מודלים',
      template: 'models',

      errors,
      successMessage,
    });
  });

  router.get('/:id', async (request, response) => {
    const errors = request.session.feedback ? request.session.feedback.errors : false;
    const successMessage = request.session.feedback ? request.session.feedback.message : false;

    request.session.feedback = {};
    const modelID = request.params.id;
    return response.render('layout', {
      pageTitle: 'מודלים',
      template: 'model',
      modelID,
      errors,
      successMessage,
    });
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
  router.post(`/feedback`, validations, async (request, response, next) => {
    try {
      const errors = validationResult(request);
      if (!errors.isEmpty()) {
        request.session.feedback = {
          errors: errors.array(),
        };
        return response.redirect(`/models/${request.body.model}#${request.body.model}feedback`);
      }

      const { name, email, title, message, model, posneg } = request.body;

      await feedbackService.addExpertData(name, email, title, message, model, posneg);
      request.session.feedback = {
        message: 'תגובתך התקבלה בהצלחה!',
      };
      let modelID = request.body.model;
      console.log(modelID);
      return response.redirect(`/models/${modelID}#${modelID}feedback`);
    } catch (err) {
      return next(err);
    }
  });
  router.post('/feedback/api', validations, async (request, response, next) => {
    try {
      const errors = validationResult(request);
      if (!errors.isEmpty()) {
        return response.json({ errors: errors.array() });
      }

      const { name, email, title, message, model, posneg } = request.body;

      await feedbackService.addExpertData(name, email, title, message, model, posneg);

      const feedback = await feedbackService.getList();
      return response.json({ feedback });
    } catch (err) {
      next(err);
    }
  });
  return router;
};
