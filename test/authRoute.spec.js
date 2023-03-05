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

describe('Authentication', () => {
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
  });

  describe('POST /api/auth/login', () => {
    it('it should return a valid token given good email & password', async () => {
      const res = await chai
        .request(server)
        .post('/api/auth/login')
        .type('json')
        .send({ email: adminUser.email, password: adminUser.password });
      res.should.have.status(200);
      res.should.have.property('body');
      res.body.should.have.property('token');
      res.body.token.should.not.eql({});
    });

    it('it should fail with a 401 status given bad credentials', async () => {
      const res = await chai
        .request(server)
        .post('/api/auth/login')
        .type('json')
        .send({
          email: adminUser.email,
          password: 'this is definitely the wrong password',
        });
      res.should.have.status(401);
      res.should.have.property('body');
      res.body.should.not.have.property('token');
    });
  });

  describe('/GET /api/auth', () => {
    it('it should return a 200 given valid token', async () => {
      // tests for using an existing token -- mirror this sort of setup in all guarded routes
      // (tokens are generated in dummies.js)
      const res = await chai
        .request(server)
        .get('/api/auth')
        .set('Authorization', regularToken)
        .send();

      res.should.have.status(200);
    });
    it('this also works for an admin token', async () => {
      const res = await chai
        .request(server)
        .get('/api/auth')
        .set('Authorization', adminToken)
        .send();

      res.should.have.status(200);
    });
  });
  describe('Other route examples', () => {
    before(async () => {
      await Product.destroy({ truncate: true, cascade: true });

      const products = [
        {
          name: 'Snake plant',
          qty: 33,
          description:
            'Dracaena trifasciata, commonly known as the snake plant, is one of the most popular and hardy species of houseplants. Up until 2017, it was botanically classified as Sansevieria trifasciata, but its commonalities with Dracaena species were too many to overlook. The plant features stiff, sword-like leaves and can range anywhere from six inches to eight feet tall. Snake plants can vary in color although many have green-banded leaves and commonly feature a yellow border. These plants are easy to grow and, in many cases, are nearly indestructible. They will thrive in very bright light or almost dark corners of the house. Snake plants generally grow slowly in indoor light, but increasing its exposure to light will boost growth if it receives a few hours of direct sun. Planting and repotting is best done in the spring.',
          price: 192.1,
          imageURL: 'http://dummyimage.com/100x100.png/dddddd/000000',
        },
        {
          name: 'Monstera',
          qty: 5,
          description:
            'Monstera Deliciosa genus of nearly 50 species of flowering plants of the arum family (Araceae), native to tropical America. Several are grown as popular ornamental foliage plants. Monstera plants are generally climbing and can be terrestrial or epiphytic. They have attractive leathery leaves that are often cut into lobes. The Swiss cheese plant, or Mexican breadfruit  is a common houseplant with showy, glossy, perforated leaves slashed to the margins; numerous horticultural varieties have been developed. When fully ripe, its sweet scaly fruit is edible and tastes like a combination of pineapple and mango. All other parts of the plant, including the unripe fruit, contain calcium oxalate and are considered mildly toxic if ingested by humans.',
          price: 161.1,
          imageURL: 'http://dummyimage.com/100x100.png/5fa2dd/ffffff',
        },
        {
          name: 'Spider Plant',
          qty: 48,
          description:
            'Spider plant, (Chlorophytum comosum), African plant of the asparagus family (Asparagaceae) commonly grown as an ornamental houseplant. The most popular varieties feature long grassy green-and-white-striped leaves. Periodically a flower stem emerges, and tiny white flowers—not always produced—are replaced by young plantlets, which can then be detached and rooted. Spider plants are easy to grow and thrive under a variety of conditions.',
          price: 21.19,
          imageURL: 'http://dummyimage.com/100x100.png/5fa2dd/ffffff',
        },
      ];

      seededProducts = await Product.bulkCreate(products);
    });

    describe('Example unguarded route', () => {
      it('GET /api/products/<productId> should return a single product', async () => {
        const res = await chai
          .request(server)
          .get(`/api/products/${seededProducts[0].id}`);

        res.should.have.status(200);

        res.body.should.be.an('object');
        res.body.should.have.property('name');
        res.body.should.have.property('qty');
        res.body.should.have.property('description');
        res.body.should.have.property('price');
      });
    });

    describe('Example guarded routes', () => {
      describe('GET /api/users/<userId> should succeed only for same-user (reg token)', () => {
        it('Same user token', async () => {
          const res = await chai
            .request(server)
            .get(`/api/users/${regularUser.id}`)
            .set('Authorization', regularToken)
            .send();

          res.should.have.status(200);

          res.body.should.be.an('object');
          res.body.should.have.property('firstName');
          res.body.should.have.property('lastName');
          res.body.firstName.should.eql(regularUser.firstName);
          res.body.lastName.should.eql(regularUser.lastName);
        });
        it('Other user token', async () => {
          const res = await chai
            .request(server)
            .get(`/api/users/${adminUser.id}`)
            .set('Authorization', regularToken)
            .send();

          res.should.have.status(403);

          res.body.should.not.have.property('firstName');
          res.body.should.not.have.property('lastName');
        });
      });
    });
    describe('GET /api/users/<userId> should succeed for any user id (admin token)', () => {
      it('Same user token', async () => {
        const res = await chai
          .request(server)
          .get(`/api/users/${adminUser.id}`)
          .set('Authorization', adminToken)
          .send();

        res.should.have.status(200);

        res.body.should.be.an('object');
        res.body.should.have.property('firstName');
        res.body.should.have.property('lastName');
        res.body.firstName.should.eql(adminUser.firstName);
        res.body.lastName.should.eql(adminUser.lastName);
      });

      it('Other user token', async () => {
        const res = await chai
          .request(server)
          .get(`/api/users/${regularUser.id}`)
          .set('Authorization', adminToken)
          .send();

        res.should.have.status(200);

        res.body.should.be.an('object');
        res.body.should.have.property('firstName');
        res.body.should.have.property('lastName');
        res.body.firstName.should.eql(regularUser.firstName);
        res.body.lastName.should.eql(regularUser.lastName);
      });
    });
  });
});
