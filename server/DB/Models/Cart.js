const Sequelize = require('sequelize');
const db = require('../database');
const { User, Product } = require('../index');

// TODO: User.belongsToMany(Product, { through: Cart })
// TODO: Product.belongsToMany(User, { through: Cart })
// TODO: do we need a hook here to constrain qty to max from product table?

// ref: https://sequelize.org/docs/v6/advanced-association-concepts/advanced-many-to-many/

const Cart = db.define('cart', {
  userId: {
    type: Sequelize.INTEGER,
    references: {
      model: User,
      key: 'id',
    },
  },

  productId: {
    type: Sequelize.INTEGER,
    references: {
      model: Product,
      key: 'id',
    },
    allowNull: false,
    validate: {
      notNull: true,
      notEmpty: true,
    },
  },

  qty: {
    type: Sequelize.INTEGER,
    allowNull: false,
    validate: {
      min: 0,
      notEmpty: true,
      notNull: true,
    },
  },
});

db.sync({ force: true });

module.exports = Cart;
