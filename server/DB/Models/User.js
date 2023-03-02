const Sequelize = require('sequelize');
const db = require('../database');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const dotenv = require('dotenv').config();

const SECRET = process.env.JWT;

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
  },
  imageURL: {
    type: Sequelize.STRING,
    defaultValue: 'Default-Avatar.svg',
    allowNull: false,
    validate: {
      notEmpty: true,
      notNull: true,
    },
  },
  // Will need hook to hash password
  password: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      // len: [8, 20], //allow strings between 8 - 20 characters
      notEmpty: true,
      notNull: true,
    },
  },
  isAdmin: {
    type: Sequelize.BOOLEAN,
    allowNull: false,
    defaultValue: false,
    validate: {
      notEmpty: true,
      notNull: true,
    },
  },
  role: {
    type: Sequelize.STRING,
    allowNull: false,
    defaultValue: 'user',
    validate: {
      isIn: [['cto', 'engineer', 'user']],
      notEmpty: true,
      notNull: true,
    },
  },
});

User.verifyByToken = async (token) => {
  try {
    const { id } = jwt.verify(token, SECRET);
    const user = await User.findByPk(id);
    if (user) {
      return user.id;
    } else {
      const error = new Error('bad credentials / bad token');
      error.status = 401;
      throw error;
    }
  } catch (err) {
    console.log('verification error: ', err);
  }
};

User.authenticate = async ({ username, password }) => {
  try {
    const user = await User.findOne({
      where: { username },
    });

    if (user && (await bcrypt.compare(password, user.password))) {
      return jwt.sign(
        { id: user.id, isAdmin: user.isAdmin, role: user.role },
        SECRET
      );
    }
    const error = new Error('bad credentials');
    error.status = 401;
    throw error;
  } catch (err) {
    console.log('Authentication error:', err);
  }
};

module.exports = User;
