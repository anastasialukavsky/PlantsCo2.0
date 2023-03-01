const Sequelize = require('sequelize');
const db = require('../database');

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
      notNull: true,
    },
  },
});

// uncomment & test after associations created

// Wishlist.beforeValidate(async (wishlist) => {
//   // TODO: unique wishlist name per-user
//   // find all wishlists for wishlist.userid
//   // if result contains wishlist.wishlistName, reject
//   const existingLists = await Wishlist.findAll({ userId: wishlist.userId });
//   for (let list of existingLists) {
//     if (list.wishlistName === wishlist.wishlistName) {
//       throw new Error('Must specify unique wishlist name...');
//     }
//   }
// });

module.exports = Wishlist;
