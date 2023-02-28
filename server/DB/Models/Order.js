const Sequelize = require('sequelize');
const db = require('../database');

const Order = db.define('order', {
  promoRate: {
    type: Sequelize.DECIMAL(10, 2),
    allowNull: false,
    defaultValue: 1,
  },
  finalPrice: {
    type: Sequelize.VIRTUAL,
    get() {
      const orderItems = this.getOrder_Detail();
      const total = orderItems.reduce(
        (acc, orderItem) => (acc += orderItem.totalPrice),
        0
      );
      return total * this.promoRate;
    },
  },
  totalQty: {
    type: Sequelize.VIRTUAL,
    get() {
      const orderItems = this.getOrder_Detail();
      const total = orderItems.reduce(
        (acc, orderItem) => (acc += orderItem.qty),
        0
      );
      return total;
    },
  },
});

module.exports = Order;
