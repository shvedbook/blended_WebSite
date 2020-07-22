const express = require('express');

const modelsRoute = require('./models');
const toolsRoute = require('./tools');

const router = express.Router();

module.exports = (params) => {
 try{
  router.get('/', (request, response, next) => {
    return response.render('layout', { pageTitle: 'מה הבלמדד שלך?', template: 'index' });
  });
 }
 catch(err){
   return next(err)
 }

  router.use('/models', modelsRoute(params));
  router.use('/tools', toolsRoute(params));

  return router;
};
