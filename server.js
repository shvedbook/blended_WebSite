const express = require('express');

const path = require('path');

const bodyParser = require('body-parser');

const cookieSession = require('cookie-session');

const createError = require('http-errors');

const FeedbackService = require('./services/FeedbackService');

const ModelService = require('./services/ModelService');

const feedbackService = new FeedbackService('./data/feedback.json');

const modelService = new ModelService('./data/models.json');

const routes = require('./routes');
const { response } = require('express');
const { request } = require('http');

const app = express();

const port = process.env.PORT || 8080;

app.set('trust proxy', 1);

app.use(
  cookieSession({
    name: 'session',
    keys: ['Alex4gy2l5i3g', 'hh3ud3u4is839dk'],
  })
);
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.set('view engine', 'ejs');
app.set('vies', path.join(__dirname, '.views'));

app.use(express.static(path.join(__dirname, './static')));

app.locals.siteName = 'מְעַרְבְּבִים';

app.use(async (request, response, next) => {
  try {
    const feedbackData = await feedbackService.getExpertData();
    response.locals.feedbackData = feedbackData;
    const modelsData = await modelService.getModelData();
    response.locals.modelsData = modelsData;
    /*all models data */
    const tivuhModelData = await modelService.getModel('tivuh-male');
    response.locals.tivuhModelData = tivuhModelData;
    const kvuzatImunModelData = await modelService.getModel('kvuzatImun');
    response.locals.kvuzatImunModelData = kvuzatImunModelData;
    const havrutaModelData = await modelService.getModel('kvuzatImun');
    response.locals.havrutaModelData = havrutaModelData;

    return next();
  } catch (err) {
    return next(err);
  }
});

app.use(
  '/',
  routes({
    feedbackService,

    modelService,
  })
);

app.use((err, request, response, next) => {
  response.locals.message = err.message;
  console.error(err);
  const status = err.status || 500;
  response.locals.status = status;
  response.status(status);
  response.render('error');
});

app.listen(port, () => {
  console.log('Express server listening on port ' + port);
});
