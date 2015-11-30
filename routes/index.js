'use strict';

const router = require('koa-router')();

// handle error

// v1
router.use('/api/v1', require('./v1'));

// homepage
router.get('/', function*() {
  this.status = 200;
  this.body = {
    status: 'ok'
  };
})

module.exports = router.routes();
