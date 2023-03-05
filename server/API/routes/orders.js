const dotenv = require('dotenv').config();
const stripe = require('stripe')(process.env.STRIPE_DEMO);
const router = require('express').Router();
const { User, Order, Order_Detail, Promo_Code } = require('../../DB');
const { isAdmin, requireToken } = require('../authMiddleware');

router.get('/', requireToken, isAdmin, async (req, res, next) => {
  try {
    const orders = await Order.findAll({
      include: [
        {
          model: User,
          required: false,
        },
        {
          model: Order_Detail,
        },
        {
          model: Promo_Code,
        },
      ],
    });
    res.status(200).json(orders);
  } catch (err) {
    next(err);
  }
});

router.post('/', async (req, res, next) => {
  try {
    const { userId, promoCodeId, orderDetail } = req.body;

    let promoCode = null;
    if (promoCodeId) {
      promoCode = await Promo_Code.findByPk(promoCodeId);

      if (!promoCode) {
        return res.status(400).send('Invalid promo code');
      }
    }

    let order = await Order.create({
      promoRate: promoCode ? promoCode.discountRate : 0,
      finalPrice: 0,
      totalQty: 0,
      promoCodeId,
      userId,
    });

    let totalQty = 0,
      finalPrice = 0;

    for (let i = 0; i < orderDetail.length; i++) {
      let row = orderDetail[i];

      const {
        userName,
        userEmail,
        address,
        productId,
        paymentMethod,
        productName,
        qty,
        basePrice,
        currencyRate,
      } = row;

      await Order_Detail.create({
        orderId: order.id,
        userId,
        userName,
        userEmail,
        address,
        productId,
        paymentMethod,
        productName,
        qty,
        basePrice,
        currencyRate,
      });

      totalQty += qty;
      finalPrice += basePrice * currencyRate * qty;
    }
    if (promoCode) finalPrice *= 1 - promoCode.discountRate;

    await order.update({ totalQty, finalPrice });

    order = await Order.findByPk(order.id, { include: [Order_Detail] });

    res.status(200).json(order);
  } catch (err) {
    next(err);
  }
});

router.delete('/:id', requireToken, isAdmin, async (req, res, next) => {
  try {
    const id = +req.params.id;

    const order = await Order.findByPk(id);
    if (!order) return res.status(404).send('Order not found');
    await order.destroy();
    res.sendStatus(204);
  } catch (err) {
    next(err);
  }
});

// router.post('/checkout', async (req, res, next) => {
//   const products = req.body.products;

//   let line_items = [];
//   for (let product of products) {
//     let lineItem = {
//       price_data: {
//         currency: 'usd',
//         product_data: { name: product.name },
//         unit_amount: product.price * 100,
//       },
//       quantity: product.qty,
//     };
//     line_items.push(lineItem);
//   }

//   const session = await stripe.checkout.sessions.create({
//     line_items,
//     mode: 'payment',
//     success_url: `http://localhost:3000/?success=true`,
//     cancel_url: `http://localhost:3000/?canceled=true`,
//   });

//   console.log('sessionURL', session.url);
//   res.redirect(303, session.url);
// });

module.exports = router;
