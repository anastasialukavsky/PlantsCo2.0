const Sequelize = require('sequelize');
const db = require('../database');

const Currency = db.define('currency', {
  currencyName: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      isIn: [['USD', 'GBP', 'EUR', 'CAD']],
      notEmpty: true,
      notNull: true,
      isUppercase: true,
    },
  },

  rate: {
    type: Sequelize.DECIMAL(12, 4),
    allowNull: false,
    validate: {
      min: 0,
      notEmpty: true,
      notNull: true,
    },
  },
});

module.exports = Currency;
