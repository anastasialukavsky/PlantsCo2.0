const Sequelize = require('sequelize');
const db = require('../database');

const User = db.define('user', {
  firstName: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  lastName: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  fullName: {
    type: DataTypes.VIRTUAL,
    get() {
      return `${this.firstName} ${this.lastName}`;
    },
    set(value) {
      throw new Error(
        'Field is set automatically, please do not try to change'
      );
    },
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true,
      notEmpty: true,
    },
    imageUrl: {
      type: Sequelize.STRING,
      defaultValue: 'Default-Avatar.svg',
    },
  },
  // Will need hook to hash password
  password: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      len: [8, 20], //allow strings between 8 - 20 characters
    },
  },
  isAdmin: {
    type: Sequelize.ENUM('true', 'false'),
    allowNull: false,
    defaultValue: 'false',
  },
  role: {
    type: Sequelize.ENUM('cto', 'engineer', 'user'),
    allowNull: true,
    defaultValue: 'user',
  },
});

module.exports = User;
