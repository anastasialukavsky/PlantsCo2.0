const Sequelize = require('sequelize');
const db = require('../database');

const Shipping = db.define('shipping', {
  street1: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  street2: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  city: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  state: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  zip: {
    type: Sequelize.INTEGER,
    allowNull: false,
    validate: {
      notEmpty: true,
      len: [5, 5],
    },
  },
  address: {
    type: Sequelize.DataTypes.VIRTUAL,
    get() {
      return `${this.street1} ${this.city}, ${this.state} ${this.zip}`;
    },
    set(value) {
      throw new Error(
        'Field is set automatically, please do not try to change'
      );
    },
  },
  isDefault: {
    type: Sequelize.ENUM('true', 'false'),
    allowNull: false,
    defaultValue: 'false',
    validate: {
      notEmpty: true,
    },
  },
});

module.exports = Shipping;
