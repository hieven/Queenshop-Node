'use strict';

const env    = process.env.NODE_ENV || 'development';

function fakeLogger() {
  return function*(next) {
    yield next;
  }
}

module.exports = env !== 'test' ? require('koa-logger') : fakeLogger;
