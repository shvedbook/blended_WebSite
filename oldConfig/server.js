const express = require('express');

const path = require('path');

const bodyParser = require('body-parser');

const cookieSession = require('cookie-session');

const FeedbackService = require('./services/FeedbackService');

const ModelService = require('./services/ModelService');

const feedbackService = new FeedbackService('./data/feedback.json');

const modelService = new ModelService('./data/models.json');

const routes = require('./routes');

const app = express();

const port = 8080;

app.set('trust proxy', 1);

app.use(
  cookieSession({
    name: 'session',
    keys: ['Alex4gy2l5i3g', 'hh3ud3u4is839dk'],
  })
);
app.use(bodyParser.urlencoded({ extended: true }));

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

app.listen(port, () => {
  console.log('Express server listening on port ' + port);
});
