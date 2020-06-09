const express = require('express');
const { check, validationResult } = require('express-validator');

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

  router.get('/:expertID', (request, response) => {
    return response.send(`detail page of ${request.params.expertID}`);
  });
  router.post(
    '/feedback',
    [
      check('name').trim().isLength({ min: 3 }).escape().withMessage('השם לא תקין'),
      check('email').trim().isEmail().normalizeEmail().withMessage('כתובת המייל לא תקינה'),
      check('title').trim().isLength({ min: 3 }).escape().withMessage('הכותרת לא תקינה'),
      check('message').trim().isLength({ min: 3 }).escape().withMessage('גוף ההודעה לא תקין'),
    ],
    async (request, response) => {
      const errors = validationResult(request);
      if (!errors.isEmpty()) {
        request.session.feedback = {
          errors: errors.array(),
        };
        return response.redirect(`/models${model}`);
      }

      const { name, email, title, message, model } = request.body;

      await feedbackService.addExpertData(name, email, title, message, model);
      request.session.feedback = {
        message: 'תגובתך התקבלה בהצלחה!',
      };
      let modelID = request.body.model;
      return response.redirect(`/models#${modelID}`);
    }
  );
  return router;
};
