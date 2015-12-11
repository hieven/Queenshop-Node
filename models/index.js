'use strict';

const config    = require('../config');
const Sequelize = require('sequelize');

const sequelize = new Sequelize(config.pg.database, config.pg.username, config.pg.password, {
  host: config.pg.host,
  port: config.pg.port,
  dialect: 'postgres',
  native: true,
  define: {paranoid: true}
});

const models = {
  Member: require('./Member')(sequelize),
  Email:  require('./Email')(sequelize)
};

models.sequelize = sequelize;

module.exports = models;
