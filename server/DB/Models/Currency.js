const Sequelize = require('sequelize');
const { db } = require('../index');

// TODO: Order.hasOne(Currency)
// TODO: Currency.belongsTo(Order)

const Currency = db.define('currency', {
  currencyName: {
    type: Sequelize.ENUM('USD', 'GBP', 'EUR', 'CAD'),
    allowNull: false,
    unique: true,
    validate: {
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
