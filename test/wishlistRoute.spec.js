process.env.NODE_ENV = 'test';

const sequelize = require('sequelize');
const { User, Product } = require('../server/DB');
const { userSetup, productSetup, wishlistSetup } = require('./dummies');

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
let seededWishlists;

describe('Wishlists', () => {
  before(async () => {
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

    if (!seededWishlists) {
      seededWishlists = await wishlistSetup(
        [regularUser, adminUser],
        seededProducts
      );
    }
  });

  // describe('POST/users/:userId/wishlists', () => {
  //   it('Creates a new wishlist given correct token,', async () => {});
  // });

  describe("GET /users/:userId/wishlists returns list of user's wishlists", () => {
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
    it('Returns an array of wishlist objects given correct token', async () => {
      res = await chai
        .request(server)
        .get(`/api/users/${adminUser.id}/wishlists`)
        .set('Authorization', adminToken)
        .send();

      res.should.have.status(200);
      res.should.have.property('body');
      res.body.should.be.an('array');
      let returnedLists = res.body;
      returnedLists.should.have.lengthOf.least(1);
      returnedLists[0].should.have.property('id');
      returnedLists[0].should.have.property('wishlistName');
      returnedLists[0].should.have.property('products');
      returnedLists[0].products.should.be.an('array');
      returnedLists[0].products.should.have.lengthOf.least(1);
      returnedLists[0].products[0].should.have.property('id');
      returnedLists[0].products[0].should.have.property('name');
      returnedLists[0].products[0].should.have.property('qty');
      returnedLists[0].products[0].should.have.property('description');
    });
  });

  describe('POST /users/:userId/wishlists creates new wishlist', () => {
    let dummyListData = {
      wishlistName: 'some wishlist name',
    };
    it('Returns a 200 status given correct token', async () => {
      res = await chai
        .request(server)
        .post(`/api/users/${regularUser.id}/wishlists`)
        .set('Authorization', regularToken)
        .send(dummyListData);

      res.should.have.status(200);
    });
    it('Returns a 200 status for any user given admin token', async () => {
      res = await chai
        .request(server)
        .post(`/api/users/${regularUser.id}/wishlists`)
        .set('Authorization', adminToken)
        .send(dummyListData);

      res.should.have.status(200);
      res = await chai
        .request(server)
        .post(`/api/users/${adminUser.id}/wishlists`)
        .set('Authorization', adminToken)
        .send(dummyListData);

      res.should.have.status(200);
    });
    it('Returns a 403 status given bad (non-admin, wrong user) token', async () => {
      res = await chai
        .request(server)
        .post(`/api/users/${adminUser.id}/wishlists`)
        .set('Authorization', regularToken)
        .send(dummyListData);

      res.should.have.status(403);
      res.body.should.not.be.an('array');
    });
    it('Returns a 403 status given no token', async () => {
      res = await chai
        .request(server)
        .post(`/api/users/${adminUser.id}/wishlists`)
        .send(dummyListData);

      res.should.have.status(403);
    });
    it('Returns a wishlist object upon success', async () => {
      res = await chai
        .request(server)
        .post(`/api/users/${regularUser.id}/wishlists`)
        .set('Authorization', regularToken)
        .send(dummyListData);

      res.should.have.status(200);
      res.body.should.have.property('wishlistName');
      res.body.wishlistName.should.equal(dummyListData.wishlistName);
      res.body.should.have.property('userId');
      res.body.userId.should.equal(regularUser.id);
    });
  });

  describe('PUT /users/:userId/wishlists updates wishlist name', () => {
    it('Returns a 200 status given correct token', async () => {
      res = await chai
        .request(server)
        .put(`/api/users/${regularUser.id}/wishlists`)
        .set('Authorization', regularToken)
        .send(dummyListData);

      res.should.have.status(200);
    });
    it('Returns a 200 status for any user given admin token', async () => {
      res = await chai
        .request(server)
        .put(`/api/users/${regularUser.id}/wishlists`)
        .set('Authorization', adminToken)
        .send(dummyListData);

      res.should.have.status(200);
      res = await chai
        .request(server)
        .put(`/api/users/${adminUser.id}/wishlists`)
        .set('Authorization', adminToken)
        .send(dummyListData);

      res.should.have.status(200);
    });
    it('Returns a 403 status given bad (non-admin, wrong user) token', async () => {
      res = await chai
        .request(server)
        .put(`/api/users/${adminUser.id}/wishlists`)
        .set('Authorization', regularToken)
        .send(dummyListData);

      res.should.have.status(403);
      res.body.should.not.be.an('array');
    });
    it('Returns a 403 status given no token', async () => {
      res = await chai
        .request(server)
        .put(`/api/users/${adminUser.id}/wishlists`)
        .send(dummyListData);

      res.should.have.status(403);
    });
  });
});
