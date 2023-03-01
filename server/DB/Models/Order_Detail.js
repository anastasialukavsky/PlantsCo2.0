const Sequelize = require('sequelize');
const db = require('../database');

const Order_Detail = db.define('order_detail', {
  userId: {
    type: Sequelize.INTEGER,
    allowNull: true,
    validate: {
      notEmpty: true,
    },
  },
  userName: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
      notNull: true,
    },
  },
  userEmail: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
      notNull: true,
    },
  },
  address: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
      notNull: true,
    },
  },
  paymentMethod: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
      notNull: true,
    },
  },
  productId: {
    type: Sequelize.INTEGER,
    allowNull: false,
    validate: {
      notEmpty: true,
      notNull: true,
    },
  },
  productName: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
      notNull: true,
    },
  },
  qty: {
    type: Sequelize.INTEGER,
    allowNull: false,
    validate: {
      notEmpty: true,
      notNull: true,
      min: 1,
    },
  },
  basePrice: {
    type: Sequelize.DECIMAL(10, 2),
    allowNull: false,
    validate: {
      notEmpty: true,
      notNull: true,
      min: 0,
    },
  },
  currencyRate: {
    type: Sequelize.DECIMAL(10, 4),
    allowNull: false,
    defaultValue: 1,
    validate: {
      notEmpty: true,
      notNull: true,
      min: 0,
    },
  },
  totalPrice: {
    type: Sequelize.VIRTUAL,
    get() {
      const total = this.basePrice * this.currencyRate * this.qty;
      return total;
    },
    set() {
      return 'Do not attempt to set this virtual field!';
    },
  },
});

module.exports = Order_Detail;
