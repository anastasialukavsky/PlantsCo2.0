const router = require('express').Router();

router.use('/products', require('./routes/products'));
router.use('/users', require('./routes/users'));
router.use('/auth', require('./routes/auth'));
<<<<<<< HEAD
// router.use('/orders', require('./routes/orders'));
router.use('/currency', require('./routes/currency'));
router.use('/promos', require('./routes/promos'));
=======
router.use('/orders', require('./routes/orders'));
// router.use('/currency', require('./routes/currency'));
// router.use('/promos', require('./routes/promos'));
>>>>>>> c13e521ca21c80c675e429d947bd31ff58615d23

router.use((req, res, next) => {
  const err = new Error('API ROUTE NOT FOUND!');
  err.status = 404;
  next(err);
});

module.exports = router;
