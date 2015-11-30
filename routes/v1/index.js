'use strict';

const router  = require('koa-router')();
const clothes = require('./clothes');

router.get('/clothes/hot',    clothes.hot);
router.get('/clothes/latest', clothes.latest);

module.exports = router.routes();
