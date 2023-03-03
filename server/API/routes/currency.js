const router = require('express').Router();
const chalk = require('chalk');
const { Currency, User } = require('../../DB');
const { requireToken, isAdmin } = require('../authMiddleware');

router.get('/', requireToken, isAdmin, async (req, res, next) => {
  try {
    const allCurrencies = await Currency.findAll({ include: User });
    res.json(allCurrencies);
  } catch (e) {
    console.error(chalk.bgRed('BACKEND ISSUE GETTING CURRENCY'));
    next(e);
  }
});

router.get('/:id', requireToken, isAdmin, async (req, res, next) => {
  try {
    const singleCurrency = await Currency.findByPk(req.params.id, {
      include: User,
    });
    res.json(singleCurrency);
  } catch (e) {
    console.error(chalk.bgRed('BACKEND ISSUE GETTING CURRENCY'));
    next(e);
  }
});

router.post('/', requireToken, isAdmin, async (req, res, next) => {
  try {
    const [newCurrency, wasCreated] = await Currency.findOrCreate({
      where: { currencyName: req.body.currencyName },
      defaults: req.body,
    });
    if (!wasCreated) return res.status(409).send('Currency already exists');
    res.status(201).json(newCurrency);
  } catch (e) {
    console.error(chalk.bgRed('BACKEND ISSUE ADDING CURRENCY'));
    next(e);
  }
});

router.put('/:id', requireToken, isAdmin, async (req, res, next) => {
  try {
    const currency = await Currency.findByPk(req.params.id);
    if (!currency) return res.status(404).send('No currency to update!');
    const updatedCurrency = await currency.update(req.body);
    res.json(updatedCurrency);
  } catch (e) {
    console.error(chalk.bgRed('BACKEND ISSUE UPDATING CURRENCY'));
    next(e);
  }
});

router.delete('/:id', requireToken, isAdmin, async (req, res, next) => {
  try {
    const currency = await Currency.findByPk(req.params.id);
    if (!currency) return res.status(404).send('No currency to delete!');
    await currency.destroy();
    res.json(currency);
  } catch (e) {
    console.error(chalk.bgRed('BACKEND ISSUE DELETING CURRENCY'));
    next(e);
  }
});

module.exports = router;
