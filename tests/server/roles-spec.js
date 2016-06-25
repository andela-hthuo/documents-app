const request = require('supertest');
const app = require('../../server/app');
const users = require('./helpers/seeds/users');
const token = require('./helpers/token');
require('./helpers/database');

describe('Roles', () => {
  const tokens = {};

  before((done) => {
    tokens.admin = token.generate(users[0]);
    tokens.user = token.generate(users[1]);
    done();
  });

  describe('PUT users/:id/role', () => {
    it('only allows admins to assign roles', (done) => {
      request(app)
        .put(`/api/users/${users[1]._id}/role`)
        .set('X-Access-Token', tokens.user)
        .send({ role: 'user' })
        .expect(403, done);
    });

    it('restricts removal of a lone admin', (done) => {
      request(app)
        .put(`/api/users/${users[0]._id}/role`)
        .set('X-Access-Token', tokens.admin)
        .send({ role: 'user' })
        .expect(403, done);
    });

    it('only accepts valid roles', (done) => {
      request(app)
        .put(`/api/users/${users[1]._id}/role`)
        .set('X-Access-Token', tokens.admin)
        .send({ role: 'hacker' })
        .expect(400, done);
    });

    it("updates user's role", (done) => {
      request(app)
        .put(`/api/users/${users[1]._id}/role`)
        .set('X-Access-Token', tokens.admin)
        .send({ role: 'admin' })
        .expect(200, done);
    });
  });
});
