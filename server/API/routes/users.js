// import requireToken and admin from middleware file

// api/user/userid/cart
router.use('/:id/cart', require('./routes/cart'));
router.use('/:id/wishlist', require('./routes/wishlist'));
