'use strict';

const models       = require('../../models');
const render       = require('../utils/applicationHelper').render;
const memberHelper = require('../utils/memberHelper');

// Models
const Member     = models.Member;
const Email      = models.Email;
const sequelize  = models.sequelize;


exports.listAll = function*() {
  const members = yield Member.findAll();

  render.call(this, 200, members);
};

exports.create = function*() {
  const form        = yield memberHelper.validateCreate(this.request.body);
  const transaction = yield sequelize.transaction();
  let member, email, body;

  try {
    member = yield Member.create({
      name: form.name
    }, {transaction});

    email = yield Email.create({
      memberId: member.get('id'),
      email: form.email
    }, {transaction});

    transaction.commit();
  } catch (error) {
    transaction.rollback();

    if (!(error instanceof models.sequelize.UniqueConstraintError)) throw error;

    // TODO: handle error code in one place
    return render.call(this, 403, {
      error: 'email has been used'
    });
  }

  body = memberHelper.formatMember(member, email);
  render.call(this, 200, body);
};

exports.show = function*() {
  const member = yield Member.findById(this.params.id);

  this.status = 200;
  this.body   = member;
};

exports.update = function*() {
  const form        = yield memberHelper.validateUpdate(this.request.body);
  const member      = yield Member.findById(this.params.id);
  const email       = yield Email.findOne({where:{memberId: this.params.id}});
  const transaction = yield sequelize.transaction();
  let body;

  try {
    yield member.update({
      name: form.name
    }, {transaction});

    yield email.update({
      email: form.email
    }, {transaction})

    transaction.commit();
  } catch (error) {
    transaction.rollback();

    throw error;
  }

  body = memberHelper.formatMember(member, email);
  render.call(this, 200, body);
};

exports.destroy = function*() {
  const member = yield Member.findById(this.params.id);

  yield member.destroy();

  render.call(this, 204, null);
};
