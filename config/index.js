'use strict';

const merge = require('lodash/object/merge');
const env   = process.env.NODE_ENV || 'development';

module.exports = merge({
  port: 3000
}, require('./' + env));
