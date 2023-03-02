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
const wishlistsList = require('./Mock-data/seedWishlist');
const promoCodes = require('./Mock-data/seedPromo');

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

    const seededUsers = await User.bulkCreate(usersList, {
      validate: true,
      individualHooks: true,
    });

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

      let newRandomTag = Math.floor(Math.random() * newTags.length);
      if (randomTag !== newRandomTag)
        await product.addTag(newTags[newRandomTag]);
    }

    console.log('Product seeding successful');

    /**
     * SEED CARTS
     * (include users, products)
     */

    console.log('Seeding carts...');

    let randomUser = Math.floor(Math.random() * seededUsers.length);

    for (let i = 1; i < randomUser; i++) {
      await Cart.create({
        userId: i,
        productId: Math.floor(Math.random() * newProducts.length) + 1,
        qty: Math.floor(Math.random() * 5) + 1,
      });
    }

    console.log('Cart seeding successful');

    /**
     * SEED WISHLISTS
     * (include users, products)
     */

    console.log('Seeding wishlists...');
    let wishlist;
    let randomProductIndex;

    for (listName of wishlistsList) {
      randomUser = Math.floor(Math.random() * seededUsers.length);
      wishlist = await seededUsers[randomUser].createWishlist(listName);
      randomProductIndex = Math.floor(Math.random() * newProducts.length);
      await wishlist.addProduct(randomProductIndex);
    }

    console.log('Wishlist seeding successful');

    /**
     * SEED PROMO CODES
     */

    console.log('Seeding promo codes...');
    const seededPromoCodes = await Promo_Code.bulkCreate(promoCodes);
    console.log('Promo code seeding successful');

    /**
     * SEED ORDER / DETAILS
     * (include users,
     * products,
     * promos,
     * currencies,
     * payment,
     * shipping)
     */
    console.log('Seeding past orders...');

    const ORDER_COUNT = 10;
    let currentOrder;
    let productCount;
    let currentProduct;
    let quantity;
    let totalQuantity;
    let randomCurrencyIndex;
    let totalPrice;
    let discountRate;
    let randomUserIndex;
    let address;
    let lineExtd;
    let currentUserId;

    for (let i = 0; i < ORDER_COUNT; i++) {
      totalPrice = 0;
      totalQuantity = 0;
      discountRate = Math.random() / 2;
      productCount = Math.floor(Math.random() * 5) + 1;
      randomCurrencyIndex =
        Math.floor(Math.random() * (seededCurrencies.length - 1)) + 1;
      randomUserIndex =
        Math.floor(Math.random() * (seededUsers.length - 1)) + 1;

      (currentUserId = Math.random() < 0.2 ? null : randomUser.id), // leave userId null sometimes
        (randomUser = await User.findByPk(randomUserIndex, {
          include: [Shipping, Payment],
        }));
      address = randomUser.shippings[0].address.join('\n');

      currentOrder = await Order.build({
        userId: currentUserId,
        promoRate: discountRate,
        totalPrice: 0,
        totalQty: 0,
      });

      await currentOrder.save(); // must save in order to generate ID; therefore qty & price must be 0 momentarily

      for (let j = 0; j < productCount; j++) {
        randomProductIndex =
          Math.floor(Math.random() * (newProducts.length - 1)) + 1;
        currentProduct = newProducts[randomProductIndex];

        quantity = Math.floor(Math.random() * 5) + 1;
        totalQuantity += quantity;

        lineExtd =
          currentProduct.price *
          (1 - discountRate) *
          quantity *
          seededCurrencies[randomCurrencyIndex].rate;
        totalPrice += lineExtd;

        await currentOrder.createOrder_detail({
          userId: currentUserId,
          userName: randomUser.fullName,
          userEmail: randomUser.email,
          address,
          paymentMethod: randomUser.payments[0].method,
          productId: randomProductIndex,
          productName: currentProduct.name,
          qty: quantity,
          basePrice: currentProduct.price,
          currencyRate: seededCurrencies[randomCurrencyIndex].rate,
        });

        currentOrder.finalPrice = totalPrice;
        currentOrder.totalQty = totalQuantity;
      }
      await currentOrder.save();
    }

    console.log('Order seeding successful');

    db.close();
  } catch (e) {
    console.log(e);
    db.close();
  }
};

seed();
