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

Order.hasMany(Order_Detail);
Order_Detail.belongsTo(Order);

Order.belongsTo(User);
User.hasMany(Order);

User.hasMany(Shipping);
Shipping.belongsTo(User);

User.hasMany(Payment);
Payment.belongsTo(User);

User.belongsTo(Currency);
Currency.hasMany(User);

Product.belongsToMany(Tag, { through: 'Product_Tags' });
Tag.belongsToMany(Product, { through: 'Product_Tags' });

User.belongsToMany(Product, { through: Cart });
Product.belongsToMany(User, { through: Cart });

Wishlist.belongsToMany(Product, { through: 'Wishlist_Detail' });
Product.belongsToMany(Wishlist, { through: 'Wishlist_Detail' });

User.hasMany(Wishlist);
Wishlist.belongsTo(User);

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
