const Sequelize = require('sequelize');
const db = require('../database');

const Promo_Code = db.define('promo_code', {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true,
    validate: {
      notEmpty: true,
      notNull: true,
    },
  },
  discountRate: {
    type: Sequelize.DECIMAL(10, 2),
    allowNull: false,
    validate: {
      notEmpty: true,
      notNull: true,
      min: 0.0,
      max: 1.0,
    },
  },
  status: {
    type: Sequelize.BOOLEAN(true, false),
    allowNull: false,
    defaultValue: false,
    validate: {
      notEmpty: true,
      notNull: true,
    },
  },
});

module.exports = Promo_Code;
