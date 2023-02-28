const Sequelize = require('sequelize');
const db = require('../database');

const Order = db.define('order', {
  totalPrice: {
    type: Sequelize.VIRTUAL,
    get() {
      const orderItems = this.getOrder_Details();
      const total = orderItems.reduce(
        (acc, orderItem) => (acc += orderItem.qty),
        0
      );
      return total;
    },
  },
  totalQty: {
    type: Sequelize.VIRTUAL,
    get() {
      const orderItems = this.getOrder_Details();
      const total = orderItems.reduce(
        (acc, orderItem) => (acc += orderItem.finalPrice),
        0
      );
      return total;
    },
  },
});

module.exports = Order;
