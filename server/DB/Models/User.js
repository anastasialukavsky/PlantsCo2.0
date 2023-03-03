const Sequelize = require('sequelize');
const db = require('../database');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const dotenv = require('dotenv').config();

const SECRET = process.env.JWT;
const SALT_ROUNDS = 10;

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

  password: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
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

/**
 * HOOKS
 */

User.beforeValidate((user) => {
  const MIN_PASSWORD_LENGTH = 8;

  const pw = user.password;
  if (pw.length < MIN_PASSWORD_LENGTH) {
    const err = new Error();
    err.message = `Minimum password requirement not met (${MIN_PASSWORD_LENGTH} characters)`;
    throw err;
  }
});

User.beforeCreate(async (user) => {
  user.password = await bcrypt.hash(user.password, SALT_ROUNDS);
});

User.beforeUpdate(async (user) => {
  if (user.password)
    user.password = await bcrypt.hash(user.password, SALT_ROUNDS);
});

/**
 * AUTH CLASS METHODS
 */

User.verifyByToken = async (token) => {
  try {
    const { id } = jwt.verify(token, SECRET);
    const user = await User.findByPk(id, {
      attributes: {
        exclude: ['password'],
      },
    });
    if (user) {
      return user;
    } else {
      const error = new Error('bad credentials / bad token');
      error.status = 401;
      throw error;
    }
  } catch (err) {
    console.log('verification error: ', err);
  }
};

User.authenticate = async ({ email, password }) => {
  try {
    const user = await User.findOne({
      where: { email },
    });

    if (user && (await bcrypt.compare(password, user.password))) {
      return jwt.sign(
        {
          id: user.id,
          email: user.email,
          isAdmin: user.isAdmin,
          role: user.role,
        },
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
