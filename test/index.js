/*eslint-env mocha */
'use strict';

const mocha = require('mocha');
require('co-mocha')(mocha);

describe('queenshop', function() {
  require('./routes');
});
