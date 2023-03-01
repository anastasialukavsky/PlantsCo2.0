const db = require('./database');
const Currency = require('./Models/Currency');
const User = require('./Models/User');
const Order = require('./Models/Order');
const Order_Detail = require('./Models/Order_Detail');
const Product = require('./Models/Product');
const Cart = require('./Models/Cart');
const Payment = require('./Models/payment');
const Promo_Code = require('./Models/Promo_Code');
const Shipping = require('./Models/shipping');
const Tag = require('./Models/Tag');
const Wishlist = require('./Models/Wishlist');

// ASSOCIATIONS HERE

module.exports = {
  db,
  Cart,
  Currency,
  Order_Detail,
  Order,
  Payment,
  Product,
  Promo_Code,
  Shipping,
  Tag,
  User,
  Wishlist,
};
