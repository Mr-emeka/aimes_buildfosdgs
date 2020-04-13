/* eslint-disable radix */
const express = require('express');
const bodyParser = require('body-parser');
const swaggerUi = require('swagger-ui-express');
const logger = require('morgan');
const cors = require('cors');
const path = require('path');
const fs = require('fs');
const { router } = require('./routes/index');
const swaggerDocument = require('../swagger.json');

const app = express();
require('dotenv').config();

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// cors
app.use(cors());

// middle ware for logs
app.use(logger('dev'));

// create log folder
// fs.mkdirSync(path.join(__dirname, './logs/'));
app.use(
  logger(
    (tokens, req, res) => [
      tokens.method(req, res),
      tokens.url(req, res),
      tokens.status(req, res),
      parseInt(tokens['response-time'](req, res).toString()) < 10
        ? `0${parseInt(tokens['response-time'](req, res).toString())}ms`
        : `${parseInt(tokens['response-time'](req, res).toString())}ms`
    ].join('\t\t'),
    {
      stream: fs.createWriteStream(path.join(__dirname, './logs/log.txt'), { flags: 'a' })
    }
  )
);

app.use(bodyParser.urlencoded({
  extended: true
}));


app.use(bodyParser.json());

app.use('/api/v1/', router);

app.get('/', (req, res) => {
  res.status(200).json({
    status: 'success',
    message: 'Welcome to covid-19 api'
  });
});

app.get('*', (req, res) => {
  res.status(404).json({
    message: '404 Route not found'
  });
});
const PORT = process.env.PORT || 3001;
app.listen(PORT);


module.exports = app;
