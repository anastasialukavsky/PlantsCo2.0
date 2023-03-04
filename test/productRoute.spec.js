process.env.NODE_ENV = 'dev';

const sequelize = require('sequelize');
const { User, Product } = require('../server/DB');
// const seed = require('../seed');

const chai = require('chai');
const chaiHttp = require('chai-http');
const should = chai.should();
const server = require('../server/server');

chai.use(chaiHttp);

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

let userSetup = {
  firstName: 'admin',
  lastName: 'user',
  password: 'adminpassword',
  email: 'email@admin.com',
  role: 'engineer',
  isAdmin: true,
  currencyId: 1,
};

let authToken;
let adminUser;
let seedProducts;

// console.log(adminUser);

xdescribe('Products', () => {
  beforeEach(async () => {
    await Product.destroy({ truncate: true, cascade: true });
    seedProducts = await Product.bulkCreate(products);
    //   console.log(adminUser);
    //   await chai
    //     .request(server)
    //     .post('http://localhost:3000/api/auth')
    //     .send({ email: adminUser.email, password: adminUser.password })
    //     .then((res) => {
    //       authToken = res.body.token;
    //     });
    //   console.log('auth token:', authToken);
  });

  describe('/GET /api/products', () => {
    it('it should return an array of all products', (done) => {
      chai
        .request(server)
        .get('/api/products')
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.an('array');
          res.body.length.should.be.eql(3);
          done();
        });
    });
  });
  it('it should return a single product', (done) => {
    chai
      .request(server)
      .get(`/api/products/${seedProducts[2].id}`)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.an('object');
        res.body.should.have.property('name');
        res.body.name.should.eql(seedProducts[2].name);
        done();
      });
  });
});
