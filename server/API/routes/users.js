const router = require('express').Router();
const { requireToken, isAdmin } = require('../authMiddleware');
const { User, Product } = require('../../DB');

// api/user/userid/cart
router.use('/:id/cart', require('./cart'));
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
    res.status(200).send(users);
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

router.get('/:userId', requireToken, async (req, res, next) => {
  try {
    const { userId } = req.params;

    // if user is not admin & they're attempting to pull someone else's data, fail w/403
    if (req.user.id === +userId || req.user.isAdmin) {
      const user = await User.findByPk(+userId, {
        include: [Product],
        attributes: { exclude: ['password'] },
      });
      res.status(200).send(user);
    } else {
      res
        .status(403)
        .send(
          'Inadequate access rights / Requested user does not match logged-in user'
        );
    }
  } catch (err) {
    next(err);
  }
});

router.put('/:userId', requireToken, async (req, res, next) => {
  const userId = +req.params.userId;

  // if user is not an admin & they're attempting to change someone else's user data, fail w/403
  if (userId !== req.user.id && !req.user.isAdmin) {
    return res
      .status(403)
      .send(
        'Inadequate access rights / Requested user does not match logged-in user'
      );
  }

  try {
    const { firstName, lastName, email, imageURL, password, isAdmin, role } =
      req.body;

    // if user is not an admin, but they're attempting to set new role or isAdmin, fail w/ 403
    if (!req.user.isAdmin && (role !== req.user.role || isAdmin)) {
      return res
        .status(403)
        .send(
          'Inadequate access rights / Requested user does not match logged-in user'
        );
    }

    // if we've made it this far we're safe to proceed
    const user = await User.findByPk(userId);

    await user.update({
      firstName,
      lastName,
      email,
      imageURL,
      password,
      role,
      isAdmin,
    });

    // pull user from the database again to include all updates
    // (and to prevent sending back password)
    return res.status(200).send(
      await User.findByPk(userId, {
        attributes: {
          exclude: ['password'],
        },
      })
    );
  } catch (err) {
    if (err.name === 'SequelizeUniqueConstraintError') {
      res.status(401).send('Email address already exists');
    } else {
      next(err);
    }
  }
});

router.delete('/:userId', requireToken, async (req, res, next) => {
  const userId = +req.params.userId;

  // if user is not admin & they're attempting to delete someone else's user, fail w/403
  if (req.user.id !== userId && !req.user.isAdmin) {
    return res
      .status(403)
      .send(
        'Inadequate access rights / Requested user does not match logged-in user'
      );
  }

  try {
    await User.destroy({ where: { id: userId } });
    res.sendStatus(204); // 204 no data (successful delete)
  } catch (err) {
    next(err);
  }
});

module.exports = router;
