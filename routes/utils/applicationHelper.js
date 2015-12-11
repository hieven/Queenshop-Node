'use strict';

exports.render = function(status, body) {
  this.status = status;
  this.body   = body;
  return;
};
