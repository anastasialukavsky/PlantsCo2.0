const Sequelize = require('sequelize');
const db = require('../database');

const User = db.define('user', {
  firstName: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
      notNull: true,
    },
  },
  lastName: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
      notNull: true,
    },
  },
  fullName: {
    type: Sequelize.DataTypes.VIRTUAL,
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
      notNull: true,
    },
    imageUrl: {
      type: Sequelize.STRING,
      defaultValue: 'Default-Avatar.svg',
      allowNull: false,
      validate: {
        notEmpty: false,
        notNull: false,
      },
    },
  },
  // Will need hook to hash password
  password: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      len: [8, 20], //allow strings between 8 - 20 characters
      notEmpty: false,
      notNull: false,
    },
  },
  isAdmin: {
    type: Sequelize.BOOLEAN,
    allowNull: false,
    defaultValue: 'false',
    validate: {
      notEmpty: false,
      notNull: false,
    },
  },
  role: {
    type: Sequelize.BOOLEAN,
    allowNull: true,
    defaultValue: 'user',
    validate: {
      notEmpty: false,
      notNull: false,
    },
  },
});

module.exports = User;
