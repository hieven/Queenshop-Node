'use strict';

const Promise = require('bluebird');
const Joi     = Promise.promisifyAll(require('joi'));

const memberCreateSchema = Joi.object().keys({
  name: Joi.string().trim().max(255).required(),
  //password: Joi.string(),
  email: Joi.string().email().required()
});

const memberUpdateSchema = Joi.object().keys({
  name: Joi.string().trim().max(255),
  //password: Joi.string(),
  email: Joi.string().email()
});

exports.validateCreate = function* (form) {
  return yield Joi.validateAsync(form, memberCreateSchema);
};

exports.validateUpdate = function* (form) {
  return yield Joi.validateAsync(form, memberUpdateSchema);
};

exports.formatMember = function(member, email) {
  return {
    email: email.get('email'),
    name: member.get('name'),
    activation: email.get('activation'),
    createdAt: member.get('createdAt'),
    updatedAt: member.get('updatedAt')
  };
};
