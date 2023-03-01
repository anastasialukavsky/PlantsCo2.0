// Import models here
const db = require('./server/DB/database');
const {
  Cart,
  Currency,
  Order_Detail,
  Order,
  Payment,
  Product,
  Promo_Code,
  Shipping,
  Tag,
  User,
  Wishlist,
} = require('./server/DB/');

const seed = async () => {
  try {
    await db.sync({ force: true });
    console.log('syncing the database');
    db.close();
  } catch (e) {
    console.log(e);
    db.close();
  }
};

seed();
