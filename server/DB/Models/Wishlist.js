const Sequelize = require('sequelize');
const { db } = require('../index');

// TODO: Wishlist.belongsToMany(Product)
// TODO: Product.belongsToMany(Wishlist)
// TODO: User.hasMany(Wishlist)
// TODO: Wishlist.belongsTo(User)

const Wishlist = db.define('wishlist', {
  wishlistName: {
    type: Sequelize.STRING,
    allowNull: false,
    defaultValue: 'default wishlist',
    validate: {
      notEmpty: true,
      notNull: true,
    },
  },
});

Wishlist.beforeValidate((wishlist) => {
  // TODO: unique wishlist name per-user
  // find all wishlists for wishlist.userid
  // if result contains wishlist.wishlistName, reject
});

module.exports = Wishlist;
