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
const currencyList = require('./Mock-data/seedCurrency');
const usersList = require('./Mock-data/seedUser');
const paymentMethodList = require('./Mock-data/seedPayment');
const shipmentList = require('./Mock-data/seedShipment');
const tagList = require('./Mock-data/seedTag');
const productList = require('./Mock-data/seedProduct');
const cartList = require('./Mock-data/seedCart');

const seed = async () => {
  try {
    await db.sync({ force: true });

    console.log('syncing the database');

    /**
     * SEED CURRENCIES
     */

    console.log('Seeding currencies...');

    const seededCurrencies = await Currency.bulkCreate(currencyList, {
      validate: true,
    });

    console.log('Currency seeding successful');

    /**
     * SEED USERS
     */

    console.log('Seeding users...');

    const seededUsers = await User.bulkCreate(usersList, { validate: true });

    console.log('User seeding successful');

    /**
     * SEED PAYMENT METHODS
     */

    console.log('Seeding payment...');

    for (let user of seededUsers) {
      let randomPaymentMethod = Math.floor(
        Math.random() * paymentMethodList.length
      );
      await user.createPayment(paymentMethodList[randomPaymentMethod]);
    }

    console.log('Payment seeding successful');

    /**
     * SEED SHIPPING ADDRESSES
     */

    console.log('Seeding shipment...');

    for (let user of seededUsers) {
      let randomShippingMethod = Math.floor(
        Math.random() * shipmentList.length
      );
      await user.createShipping(shipmentList[randomShippingMethod]);
    }
    console.log('Shipment seeding successful');

    /**
     * SEED TAGS
     */

    console.log('Seeding tags...');

    const newTags = await Tag.bulkCreate(tagList, { validate: true });

    console.log('Tags seeding succussful');

    /**
     * SEED PRODUCTS
     * (include tags)
     */

    console.log('Seeding products...');

    const newProducts = await Product.bulkCreate(productList, {
      validate: true,
    });
    for (let product of newProducts) {
      let randomTag = Math.floor(Math.random() * newTags.length);
      await product.addTag(newTags[randomTag]);
    }

    console.log('Product seeding successful');
    
    /**
     * SEED CARTS
     * (include users, products)
     */

    console.log('Seeding carts...');

      let randomUser = Math.floor(Math.random() * seededUsers.length);
  
      for (let i = 1; i < randomUser; i++) {
        await Cart.create({userId:i, productId:i, qty: 1})
      }
      
      console.log('Cart seeding successful');
    
    /**
     * SEED WISHLISTS
     * (include users, products)
     */

    /**
     * SEED PROMO CODES
     */

    /**
     * SEED ORDER / DETAILS
     * (include users,
     * products,
     * promos,
     * currencies,
     * payment,
     * shipping)
     */

    db.close();
  } catch (e) {
    console.log(e);
    db.close();
  }
};

seed();
