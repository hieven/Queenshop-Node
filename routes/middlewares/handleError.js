'use strict';

const sequelize = require('../../models').sequelize;
const ERROR_CODE = require('../../config').ERROR_CODE;

function handleSequelizeError(error) {
  if (error instanceof sequelize.ValidationError) {
    error.status  = 403;
    error.message = {
      name: error.name,
      field: error.errors[0].path,
      message: error.errors[0].message
    };
  }
}

function handleJoiError(error) {
  const type    = error.details[0].type;
  const message = error.details[0].message;
  const code    = ERROR_CODE[type] || 500;

  error.status  = 403;
  return Object.assign({}, {code, type, message});
}

module.exports = function*(next) {
  try {
    yield next;

  } catch (error) {

    handleSequelizeError(error);

    if (error.details) {
      error.message = handleJoiError(error);
    }

    this.status = error.status || 500;
    this.body   = error.message;
    this.app.emit('error', error, this);
  }
};
