const express = require('express');

const path = require('path');

const bodyParser = require('body-parser');

const cookieSession = require('cookie-session');

const FeedbackService = require('./services/FeedbackService');

const ExpertsService = require('./services/ExpertsService');

const ModelService = require('./services/ModelService');

const feedbackService = new FeedbackService('./data/feedback.json');

const expertsService = new ExpertsService('./data/Exprets.json');

const modelService = new ModelService('./data/models.json');

const routes = require('./routes');

const app = express();

const port = 3000;

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
    const names = await expertsService.getExpertData();
    response.locals.experttData = names;

    return next();
  } catch (err) {
    return next(err);
  }
});

app.use(
  '/',
  routes({
    feedbackService,
    expertsService,
    modelService,
  })
);

app.listen(port, () => {
  console.log('Express server listening on port ' + port);
});
