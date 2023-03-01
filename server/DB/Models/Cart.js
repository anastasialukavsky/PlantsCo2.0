const Sequelize = require('sequelize');
const { db } = require('../index');

// TODO: import User table once available
// TODO: import Product table once available
// TODO: User.belongsToMany(Product, { through: Cart })
// TODO: Product.belongsToMany(User, { through: Cart })

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
  },
  qty: {
    type: Sequelize.INTEGER,
    allowNull: false,
    validate: {
      min: 0,
    },
  },
});

module.exports = { Cart };
