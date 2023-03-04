// process.env.NODE_ENV = 'test';

const sequelize = require('sequelize');
const { User, Product, Wishlist } = require('../server/DB');
const chai = require('chai');
const server = require('../server/server');

const productInfo = [
  {
    name: 'Snake plant',
    qty: 33,
    description:
      'Dracaena trifasciata, commonly known as the snake plant, is one of the most popular and hardy species of houseplants. Up until 2017, it was botanically classified as Sansevieria trifasciata, but its commonalities with Dracaena species were too many to overlook. The plant features stiff, sword-like leaves and can range anywhere from six inches to eight feet tall. Snake plants can vary in color although many have green-banded leaves and commonly feature a yellow border. These plants are easy to grow and, in many cases, are nearly indestructible. They will thrive in very bright light or almost dark corners of the house. Snake plants generally grow slowly in indoor light, but increasing its exposure to light will boost growth if it receives a few hours of direct sun. Planting and repotting is best done in the spring.',
    price: 192.1,
    imageURL: '/assets/product_img/plant1.png',
  },
  {
    name: 'Monstera',
    qty: 5,
    description:
      'Monstera Deliciosa genus of nearly 50 species of flowering plants of the arum family (Araceae), native to tropical America. Several are grown as popular ornamental foliage plants. Monstera plants are generally climbing and can be terrestrial or epiphytic. They have attractive leathery leaves that are often cut into lobes. The Swiss cheese plant, or Mexican breadfruit  is a common houseplant with showy, glossy, perforated leaves slashed to the margins; numerous horticultural varieties have been developed. When fully ripe, its sweet scaly fruit is edible and tastes like a combination of pineapple and mango. All other parts of the plant, including the unripe fruit, contain calcium oxalate and are considered mildly toxic if ingested by humans.',
    price: 161.1,
    imageURL: '/assets/product_img/plant2.png',
  },
];

const adminInfo = {
  firstName: 'Travus',
  lastName: 'Seater',
  email: 'tseater1@nature.com',
  imageURL: 'http://dummyimage.com/100x100.png/5fa2dd/ffffff',
  password: 'Q4dgqiiH',
  isAdmin: true,
  role: 'user',
  currencyId: 1,
};

const userInfo = {
  firstName: 'Joellyn',
  lastName: 'Moreno',
  email: 'jmoreno2@baidu.com',
  imageURL: 'http://dummyimage.com/100x100.png/ff4444/ffffff',
  password: 'LVuVthfVZDX',
  isAdmin: false,
  role: 'user',
  currencyId: 4,
};

async function productSetup() {
  await Product.destroy({ cascade: true, truncate: true });
  seededProducts = await Product.bulkCreate(productInfo);
  return seededProducts;
}

async function userSetup() {
  await User.destroy({ cascade: true, truncate: true });
  regularUser = await User.create(userInfo);
  regularUser.password = userInfo.password;
  adminUser = await User.create(adminInfo);
  adminUser.password = adminInfo.password;

  // log in the regular user & store token
  let res = await chai
    .request(server)
    .post('/api/auth/login')
    .type('json')
    .send({ email: userInfo.email, password: userInfo.password });

  regularToken = res.body.token;

  // log in the admin user & store token
  res = await chai
    .request(server)
    .post('/api/auth/login')
    .type('json')
    .send({ email: adminInfo.email, password: adminInfo.password });

  adminToken = res.body.token;

  return { regularUser, adminUser, regularToken, adminToken };
}

async function wishlistSetup(users, products) {
  let wishlists = [];

  const randomProductIdx = () => Math.floor(Math.random() * products.length);

  const addRandomProduct = async (newWishlist) =>
    await newWishlist.addProduct(products[randomProductIdx()].id);

  for (let user of users) {
    let newWishlist = await Wishlist.create({
      userId: user.id,
      wishlistName: `${user.firstName}'s Wishlist`,
    });
    await addRandomProduct(newWishlist);
    if (user.id % 2 === 0) await addRandomProduct(newWishlist);

    wishlists.push(newWishlist);
  }
  return wishlists;
}

module.exports = { productSetup, userSetup, wishlistSetup };
