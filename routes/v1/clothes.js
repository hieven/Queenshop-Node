'use strict';

const queenshopScraper = require('../../services/queenshopScraper');

exports.hot = function*() {
  let body = yield queenshopScraper.fetchHot();

  this.status = 200;
  this.body   = body;
};

exports.latest = function*() {
  let body = yield queenshopScraper.fetchLatest();

  this.status = 200;
  this.body   = body;
};
