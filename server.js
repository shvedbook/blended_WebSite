const express = require('express');

const path = require('path');

const app = express();

const port = 3000;

app.use(express.static(path.join(__dirname, './static')));

app.get('/', (request, response) => {
  response.sendFile(path.join(__dirname, './static/index.html'));
});

app.get('/experts', (request, response) => {
  response.sendFile(path.join(__dirname, './static/exprets.html'));
});

app.get('/casestudy', (request, response) => {
  response.sendFile(path.join(__dirname, './static/casestudy.html'));
});

app.get('/models', (request, response) => {
  response.sendFile(path.join(__dirname, './static/models.html'));
});

app.get('/tools', (request, response) => {
  response.sendFile(path.join(__dirname, './static/tools.html'));
});

app.get('/forum', (request, response) => {
  response.sendFile(path.join(__dirname, './static/forum.html'));
});

app.listen(port, () => {
  console.log('Express server listening on port ' + port);
});
