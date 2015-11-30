'use strict';

const router    = require('koa-router')();
const queenshop = require('./queenshop');

router.get('/queenshop/hot', queenshop.hot);

module.exports = router.routes();
