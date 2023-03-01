const Sequelize = require('sequelize');
const { db } = require('../index');

const Currency = db.define('currency', {
  currencyName: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  rate: {
    type: Sequelize.DECIMAL(12, 4),
    allowNull: false,
    validate: {
      isUppercase: true,
      min: 0,
    },
  },
});

module.exports = Currency;
