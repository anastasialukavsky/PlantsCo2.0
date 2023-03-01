const Sequelize = require('sequelize');
const { db } = require('../index');

const Cart = db.define('cart', {
  qty: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
});

module.exports = Cart;
