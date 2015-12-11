'use strict';

const router = require('koa-router')();
const member = require('./member');
const clothe = require('./clothe');

// Member
router.get('/members',     member.listAll);
router.post('/members',    member.create);
router.get('/members/:id', member.show);
router.put('/members/:id', member.update);
router.del('/members/:id', member.destroy);


router.get('/clothes/hot',    clothe.hot);
router.get('/clothes/latest', clothe.latest);

module.exports = router.routes();
