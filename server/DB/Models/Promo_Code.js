const Sequelize = require('sequelize');
const db = require('../database');

const Promo_Code = db.define('promo_code', {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true,
    validate: {
      notEmpty: true,
    },
  },
  discountRate: {
    type: Sequelize.DECIMAL(10, 2),
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  status: {
    type: Sequelize.ENUM('true', 'false'),
    allowNull: false,
    defaultValue: 'false',
    validate: {
      notEmpty: true,
    },
  },
});

module.exports = Promo_Code;
