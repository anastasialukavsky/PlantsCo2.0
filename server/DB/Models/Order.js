const Sequelize = require('sequelize');
const db = require('../database');

const Order = db.define('order', {
  promoRate: {
    type: Sequelize.DECIMAL(10, 2),
    allowNull: false,
    defaultValue: 1,
    validate: {
      isEmpty: false,
    },
  },
  finalPrice: {
    type: Sequelize.DECIMAL(10, 2),
    allowNull: false,
    validate: {
      isEmpty: false,
    },
  },
  totalQty: {
    type: Sequelize.INTEGER,
    allowNull: false,
    validate: {
      isEmpty: false,
    },
  },
});

module.exports = Order;
