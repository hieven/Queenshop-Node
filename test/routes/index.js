/*eslint-env mocha */
'use strict';

const server  = require('../../server');
const request = require('supertest-as-promised');

describe('routes', function() {
  before(function() {
    this.request = request.agent(server.listen());
  });

  after(function() {
    this.request = null;
  });

  require('./member');
});
