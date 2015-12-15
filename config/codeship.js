'use strict';

module.exports = {
  'port': 3000,
  'shopHost': {
    'queenshop': 'https://www.queenshop.com.tw/'
  },
  'pg': {
    'driver': 'pg',
    'host': 'localhost',
    'port': '5434',
    'database': 'test',
    'username': process.env.PG_USER,
    'password': process.env.PG_PASSWORD
  }
}
