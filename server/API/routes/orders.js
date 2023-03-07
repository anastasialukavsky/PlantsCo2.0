const dotenv = require('dotenv').config();
const stripe = require('stripe')(process.env.STRIPE_DEMO);
const router = require('express').Router();
const { de } = require('date-fns/locale');
const {
  User,
  Order,
  Order_Detail,
  Promo_Code,
  Currency,
  Product,
} = require('../../DB');
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
    const { name, address, userEmail, promoCode, cart, userId, currencyId } =
      req.body;

    // console.log('req/body', req.body);
    let promo = null;
    if (promoCode) {
      promo = await Promo_Code.findOne({ where: { name: promoCode } });
      console.log('promo', promo);
      if (!promo) {
        return res.status(400).send('Invalid promo code');
      }
    }

    let order = await Order.create({
      promoRate: promo ? promo.discountRate : 0,
      finalPrice: 0,
      totalQty: 0,
      promoCode: promo ? promo.id : null,
      userId,
      status: 'pending',
    });

    let orderDetail = [];
    let currency = await Currency.findByPk(currencyId);
    let totalPrice = 0;

    for (let line of cart) {
      let detailLine = {};
      let product = await Product.findByPk(line.productId);

      detailLine.qty = line.qty;
      detailLine.userName = `${name.firstName} ${name.lastName}`;
      detailLine.userEmail = userEmail;
      detailLine.address = `${address.street1} ${address.street2} ${address.city} ${address.state} ${address.zip}`;
      detailLine.productId = line.productId;
      detailLine.paymentMethod = 'stripe';
      detailLine.productName = product.name;
      detailLine.basePrice = product.price;
      detailLine.currencyRate = currency.rate;
      detailLine.orderId = order.id;
      detailLine.userId = userId;

      order.totalQty += line.qty;
      totalPrice += line.qty * product.price * currency.rate;

      orderDetail.push(detailLine);
    }

    order.finalPrice = totalPrice * (1 - order.promoRate);

    await order.save();

    await Order_Detail.bulkCreate(orderDetail, { validate: true });

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

router.post('/checkout', async (req, res, next) => {
  const order = req.body;
  
  let line_items = [];
  for (let product of order.order_details) {
    let lineItem = {
      price_data: {
        currency: 'usd',
        product_data: { name: product.productName },
        unit_amount: Math.round(
          product.basePrice *
          product.currencyRate *
          (1 - order.promoRate) *
          100),
      },
      quantity: product.qty,
    };
    line_items.push(lineItem);
  }

  const session = await stripe.checkout.sessions.create({
    line_items,
    mode: 'payment',
    success_url: `http://localhost:3000/?status=complete&orderid=${order.id}`,
    cancel_url: `http://localhost:3000/?status=failed&orderid=${order.id}`,
  });

  console.log('sessionURL', session.url);
  res.send(session.url);
});

router.put('/:orderId', async (req, res, next) => {
  try {
    const id = +req.params.orderId;
    const order = await Order.findByPk(id, { include: Order_Detail });
    order.update({ status: req.body.status });
    res.status(200).json(order);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
