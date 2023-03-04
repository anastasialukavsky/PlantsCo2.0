process.env.NODE_ENV = 'test';

const sequelize = require('sequelize');
const { User, Product } = require('../server/DB');
const { userSetup, productSetup } = require('./dummies');

const chai = require('chai');
const chaiHttp = require('chai-http');
const should = chai.should();
const server = require('../server/server');

chai.use(chaiHttp);

let regularUser;
let regularToken;
let adminUser;
let adminToken;
let seededProducts;
let createdWishlist;

describe('Wishlists', () => {
  beforeEach(async () => {
    if (!adminToken || !regularToken) {
      const temp = await userSetup();
      regularUser = temp.regularUser;
      regularToken = temp.regularToken;
      adminUser = temp.adminUser;
      adminToken = temp.adminToken;
    }
    if (!seededProducts) {
      seededProducts = await productSetup();
    }
  });

  describe('POST/users/:userId/wishlists', () => {
    it('Creates a new wishlist given correct token,', async () => {});
  });

  describe('GET /users/:userId/wishlists', () => {
    it('Returns a 200 status given correct token', async () => {
      res = await chai
        .request(server)
        .get(`/api/users/${regularUser.id}/wishlists`)
        .set('Authorization', regularToken)
        .send();

      res.should.have.status(200);
    });
    it('Returns a 200 status for any user given admin token', async () => {
      res = await chai
        .request(server)
        .get(`/api/users/${regularUser.id}/wishlists`)
        .set('Authorization', adminToken)
        .send();

      res.should.have.status(200);
      res = await chai
        .request(server)
        .get(`/api/users/${adminUser.id}/wishlists`)
        .set('Authorization', adminToken)
        .send();

      res.should.have.status(200);
    });
    it('Returns an array of wishlist objects given correct token', async () => {
      res = await chai
        .request(server)
        .get(`/api/users/${adminUser.id}/wishlists`)
        .set('Authorization', adminToken)
        .send();

      res.should.have.status(200);
      res.should.have.property('body');
      res.body.should.be.an('array');
    });
    it('Returns a 403 status given bad (non-admin, wrong user) token', async () => {
      res = await chai
        .request(server)
        .get(`/api/users/${adminUser.id}/wishlists`)
        .set('Authorization', regularToken)
        .send();

      res.should.have.status(403);
    });
    it('Returns a 403 status given no token', async () => {
      res = await chai
        .request(server)
        .get(`/api/users/${adminUser.id}/wishlists`)
        .send();

      res.should.have.status(403);
    });
  });
});
