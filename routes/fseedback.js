const express = require('express');

const { check, validationResult } = require('express-validator');

const router = express.Router();

module.exports = (params) => {
  const { feedbackService } = params;

  router.get('/', async (request, response) => {
    const erros = request.session.feedback ? request.session.feedback.errors : false;
    request.session.feedback = {};

    return response.render('layout', {
      pageTitle: 'מומחי תוכן',
      tamplate: 'experts',
      feedback,
      errors,
    });
  });

  return router;
};
