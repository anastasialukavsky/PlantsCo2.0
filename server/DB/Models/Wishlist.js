const Sequelize = require('sequelize');
const { db } = require('../index');

const Wishlist = db.define('wishlist', {
  wishlistName: {
    type: Sequelize.STRING,
    allowNull: false,
    defaultValue: 'default wishlist',
    validate: {
      notEmpty: true,
    },
  },
});

module.exports = Wishlist;
