const Sequelize = require('sequelize');
const { db } = require('../index');

// TODO: Order.hasOne(Currency)
// TODO: Currency.belongsTo(Order)

const Currency = db.define('currency', {
  currencyName: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
      isUppercase: true,
    },
  },
  rate: {
    type: Sequelize.DECIMAL(12, 4),
    allowNull: false,
    validate: {
      min: 0,
    },
  },
});

module.exports = { Currency };
