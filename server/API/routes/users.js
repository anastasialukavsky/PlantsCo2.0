const router = require('express').Router();
const { requireToken, isAdmin } = require('../authMiddleware');
const { User } = require('../../DB');

// api/user/userid/cart
// router.use('/:id/cart', require('./cart'));
// router.use('/:id/wishlist', require('./wishlist'));

router.get('/', requireToken, isAdmin, async (req, res, next) => {
  // fetch all users info (ADMIN ONLY)
  // any includes? payments/shipments? cart? wishlists?
  try {
    const users = await User.findAll({
      attributes: {
        exclude: ['password'],
      },
    });
  } catch (err) {
    next(err);
  }
});

router.post('/', async (req, res, next) => {
  try {
    const { firstName, lastName, email, imageURL, password } = req.body;

    const newUser = await User.create({
      firstName,
      lastName,
      email,
      imageURL: imageURL || 'Default-Avatar.svg',
      password,
    });
    if (newUser.id) {
      res
        .status(201)
        .send({ token: await User.authenticate({ email, password }) });
    }
  } catch (err) {
    if (err.name === 'SequelizeUniqueConstraintError') {
      res.status(401).send('User already exists');
    } else {
      next(err);
    }
  }
});

router.get('/:userId', requireToken, (req, res, next) => {
  try {
  } catch (err) {
    next(err);
  }
});

module.exports = router;
