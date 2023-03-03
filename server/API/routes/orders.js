// POST routes from frontend checkout to orders table
// GET for reporting

// // POST routes from frontend checkout to orders table
// // GET for reporting
// // This is a public sample test API key.
// // Don’t submit any personally identifiable information in requests made with this key.
// // Sign in to see your own test API key embedded in code samples.
// const dotenv = require('dotenv').config();
// const stripe = require('stripe')(process.env.STRIPE_DEMO);
// const router = require('express').Router();
// // const app = express();
// // app.use(express.static('public'));

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

//   // const order = Order.create()
//   console.log('sessionURL', session.url);
//   res.redirect(303, session.url);
// });

// module.exports = router;
