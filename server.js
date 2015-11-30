'use strict';

const koa    = require('koa');
const logger = require('koa-logger');

const app = koa();
app.env   = process.env.NODE_ENV || 'development';
app.proxy = true;

// logger
app.use(logger());

// middlewares

// routes
app.use(require('./routes'));

app.on('error', (error, ctx) => {
  console.error(`server error ${error}`);
  console.error('status', ctx);
});

module.exports = app;
