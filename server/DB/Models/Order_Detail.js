const Sequelize = require('sequelize');
const db = require('../database');

const Order_Detail = db.define('order_detail', {
  userId: {
    type: Sequelize.INTEGER,
    allowNull: true,
    validate: {
      isEmpty: false,
    },
  },
  userName: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      isEmpty: false,
    },
  },
  userEmail: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      isEmpty: false,
    },
  },
  address: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      isEmpty: false,
    },
  },
  paymentMethod: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      isEmpty: false,
    },
  },
  productId: {
    type: Sequelize.INTEGER,
    allowNull: false,
    validate: {
      isEmpty: false,
    },
  },
  productName: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      isEmpty: false,
    },
  },
  qty: {
    type: Sequelize.INTEGER,
    allowNull: false,
    validate: {
      isEmpty: false,
    },
  },
  basePrice: {
    type: Sequelize.DECIMAL(10, 2),
    allowNull: false,
    validate: {
      isEmpty: false,
    },
  },
  currencyRate: {
    type: Sequelize.DECIMAL(10, 2),
    allowNull: false,
    defaultValue: 1,
    validate: {
      isEmpty: false,
    },
  },
  totalPrice: {
    type: Sequelize.VIRTUAL,
    get() {
      const total = this.basePrice * this.currencyRate * this.qty;
      return total;
    },
  },
});

module.exports = Order_Detail;
