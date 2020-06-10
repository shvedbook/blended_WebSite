const express = require('express');
const { check, validationResult } = require('express-validator');

const router = express.Router();

module.exports = (params) => {
  const { expertsService } = params;
  const { feedbackService } = params;

  router.get('/', async (request, response) => {
    const errors = request.session.feedback ? request.session.feedback.errors : false;
    const successMessage = request.session.feedback ? request.session.feedback.message : false;

    request.session.feedback = {};
    const experts = await expertsService.getList();
    return response.render('layout', {
      pageTitle: 'מומחי תוכן',
      template: 'experts',
      experts,
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
      check('name').trim().isLength({ min: 3 }).escape().withMessage('a valid name is required'),
      check('email')
        .trim()
        .isEmail()
        .normalizeEmail()
        .withMessage('a valid email address is required'),
      check('title').trim().isLength({ min: 3 }).escape().withMessage('a valid title is required'),
      check('message')
        .trim()
        .isLength({ min: 3 })
        .escape()
        .withMessage('a valid message is required'),
    ],
    async (request, response) => {
      const errors = validationResult(request);
      if (!errors.isEmpty()) {
        request.session.feedback = {
          errors: errors.array(),
        };
        return response.redirect(`/models${modelID}`);
      }

      const { name, email, title, message, model } = request.body;

      await feedbackService.addExpertData(name, email, title, message, model);
      request.session.feedback = {
        message: 'תגובתך התקבלה בהצלחה!',
      };
      return response.redirect(`/models#${model}`);
    }
  );
  return router;
};
