const Sequelize = require('sequelize');
const { db } = require('../index');

// TODO: Wishlist.belongsToMany(Product)
// TODO: Product.belongsToMany(Wishlist)
// TODO: User.hasMany(Wishlist)
// TODO: Wishlist.belongsTo(User)

const Wishlist = db.define('wishlist', {
  wishlistName: {
    type: Sequelize.STRING,
    allowNull: false,
    defaultValue: 'default wishlist',
    validate: {
      notEmpty: true,
    },
  },
});

// PB: Fairly certain this isn't necessary - should be created by M:M assoc
// recommend deleting after associations & testing

// const WishlistProducts = db.define('wishlist_products', {
//   wishlistId: {
//     type: Sequelize.INTEGER,
//     references: {
//       model: Wishlist,
//       key: 'id',
//     },
//   },
//   productId: {
//     type: Sequelize.INTEGER,
//     references: {
//       model: Product,
//       key: 'id',
//     },
//   },
// });

module.exports = { Wishlist };
