/*eslint-env mocha */
'use strict';
const expect     = require('chai').expect; // eslint-disable-line
const ERROR_CODE = require('../../config').ERROR_CODE;

const models = require('../../models');
const Member = models.Member;
const Email  = models.Email;

describe('members', function() {
  describe('listAll', function() {
    it('should list', function*() {
      const memberCount = yield Member.count();

      const res = yield this.request.get('/v1/members').expect(200);

      expect(res.body.length).to.equal(memberCount);
    });
    it('should use limit');
    it('should use before');
    it('should use after');
    it('should has scope');
  });

  describe('create', function() {
    afterEach(function*() {
      yield Member.destroy({where: {}, force: true});
      yield Email.destroy({where: {}, force: true});
    })
    it('should create member', function*() {
      const data = {name: 'even', email: 'even@gmail.com'};
      yield this.request.post('/v1/members')
        .send(data)
        .expect(201);

      const even  = yield Member.findOne({where: {name: data.name}});
      const email = yield Email.findOne({where: {email: data.email}});

      expect(even).to.exist;
      expect(email).to.exist;
    });
    it('should return correct format after creating', function*() {
      const data = {name: 'even', email: 'even@gmail.com'};
      const res  = yield this.request.post('/v1/members')
        .send(data)
        .expect(201);

      expect(res.body).to.have.any.keys(data);
    });
    it('should not create member without name', function*() {
      const data = {email: 'even@gmail.com'};
      const res  = yield this.request.post('/v1/members')
        .send(data)
        .expect(403);

      expect(res.body).to.have.any.keys(['code', 'type', 'message']);
      expect(res.body.code).to.equal(ERROR_CODE[res.body.type]);
    });
    it('should not create member if name is longer than 255');
    it('should not create member without email', function*() {
      const data = {name: 'even'};
      const res  = yield this.request.post('/v1/members')
        .send(data)
        .expect(403);

      expect(res.body).to.have.any.keys(['code', 'type', 'message']);
      expect(res.body.code).to.equal(ERROR_CODE[res.body.type]);
    });
    it('should not create member if email format is invalid', function*() {
      const data = {name: 'even', email: 'even@'};
      const res  = yield this.request.post('/v1/members')
        .send(data)
        .expect(403);

      expect(res.body).to.have.any.keys(['code', 'type', 'message']);
      expect(res.body.code).to.equal(ERROR_CODE[res.body.type]);
    });
  });
  describe('show', function() {
    it('should show member data');
  });
  describe('update', function() {
    it('should be updated');
    it('should not update member not belongs to you');
    it('should update anyway if admin');
    it('should have scope');
  });
  describe('destroy', function() {
    it('should be destroyed');
    it('should not destroy other member');
    it('should be destroyed anyway if admin')
    it('should have scope');
  });
});
