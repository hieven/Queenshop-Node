'use strict';

const router  = require('koa-router')();
const koaBody = require('koa-body')();

// handle error
router.use(require('./middlewares/handleError'));

// koa-body for parsing request data
router.use(koaBody);

// v1
router.use('/v1', require('./v1'));

// homepage
router.get('/', function*() {
  this.status = 200;
  this.body = {
    status: 'ok'
  };
})

module.exports = router.routes();
