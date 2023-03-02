const router = require('express').Router();
const { User } = require('../../DB');
const { requireToken, isAdmin } = require('../authMiddleware');

/**
 * INBOUND ROUTE: /api/auth
 */

router.get('/', requireToken, (req, res, next) => {
  try {
    res.send(req.user);
  } catch (ex) {
    next(ex);
    1;
  }
});

router.post('/login', async (req, res, next) => {
  try {
    const { email, password } = req.body;
    res.send({ token: await User.authenticate({ email, password }) });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
