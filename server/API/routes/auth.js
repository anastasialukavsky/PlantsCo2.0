const { User } = require('../../DB');
const { requireToken, isAdmin } = require('../authMiddleware');
// express routes that handle post (serve new tokens) and get (verify tokens) requests

// log in routes

// POST '/signup'
// only retrieve necessary info (username, password) from req.body
// create user using these fields (to avoid injection errors)

// GET '/user'

const router = require('express').Router();

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

router.post('/signin', async (req, res, next) => {
  try {
    console.log('req.body:', req.body);
    const { email, password } = req.body;
    res.send({ token: await User.authenticate({ email, password }) });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
