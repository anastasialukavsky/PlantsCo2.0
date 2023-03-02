const router = require('express').Router();
const { requireToken, isAdmin } = require('../authMiddleware');
const { User } = require('../../DB');
// import requireToken and admin from middleware file

// api/user/userid/cart
// router.use('/:id/cart', require('./cart'));
// router.use('/:id/wishlist', require('./wishlist'));

router.post('/', async (req, res, next) => {
  try {
    const { firstName, lastName, email, imageURL, password } = req.body;

    const newUser = await User.create({
      firstName,
      lastName,
      email,
      imageURL: imageURL || 'Default-Avatar.svg',
      password,
      role: 'user',
    });
    if (newUser.id) {
      res
        .status(200)
        .send({ token: await User.authenticate({ email, password }) });
    }
  } catch (err) {
    next(err);
  }
});

module.exports = router;
