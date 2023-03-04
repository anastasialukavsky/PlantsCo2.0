process.env.NODE_ENV = 'test';

const sequelize = require('sequelize');
const { User, Product } = require('../server/DB');

const chai = require('chai');
const chaiHttp = require('chai-http');
const should = chai.should();
const server = require('../server/server');

// const seed = require('../seed');

chai.use(chaiHttp);

const adminDummy = {
  firstName: 'Travus',
  lastName: 'Seater',
  email: 'tseater1@nature.com',
  imageURL: 'http://dummyimage.com/100x100.png/5fa2dd/ffffff',
  password: 'Q4dgqiiH',
  isAdmin: true,
  role: 'user',
  currencyId: 1,
};

const userDummy = {
  firstName: 'Joellyn',
  lastName: 'Moreno',
  email: 'jmoreno2@baidu.com',
  imageURL: 'http://dummyimage.com/100x100.png/ff4444/ffffff',
  password: 'LVuVthfVZDX',
  isAdmin: false,
  role: 'user',
  currencyId: 4,
};

let regularUser;
let regularToken;
let adminUser;
let adminToken;
let seededProducts;

describe('Wishlists', () => {
  beforeEach(async () => {
    // empty the Users table
    await User.destroy({ truncate: true, cascade: true });

    // add 2 users (1 regular / 1 admin)
    regularUser = await User.create(userDummy);
    adminUser = await User.create(adminDummy);
    const seedUsers = [regularUser, adminUser];

    // log in the regular user & store token
    let res = await chai
      .request(server)
      .post('/api/auth/login')
      .type('json')
      .send({ email: userDummy.email, password: userDummy.password });

    regularToken = res.body.token;

    // log in the admin user & store token
    res = await chai
      .request(server)
      .post('/api/auth/login')
      .type('json')
      .send({ email: adminDummy.email, password: adminDummy.password });

    adminToken = res.body.token;
  });

  describe('GET /users/<userId>/wishlists', () => {
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
