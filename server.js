'use strict';

const koa    = require('koa');
const logger = require('./logger');

const app = koa();
app.env   = process.env.NODE_ENV || 'development';
app.proxy = true;

// logger
app.use(logger());

// middlewares
app.use(require('koa-cors')());

// routes
app.use(require('./routes'));

app.on('error', error => {
  if (process.env.NODE_ENV === 'test') return;
  console.error('Server Error');
  console.error(error);
});

module.exports = app;
