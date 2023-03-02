// admin permissions to edit promo table
const router = require('express').Router();
const chalk = require('chalk');
const { Promo_Code, Order } = require('../../DB');

router.get('/', async (req, res, next) => {
  try {
    const allPromos = await Promo_Code.findAll();
    res.json(allPromos);
  } catch (e) {
    console.error(chalk.bgRed('BACKEND ISSUE GETTING PROMO_CODES'));
    next(e);
  }
});

router.get('/:id', async (req, res, next) => {
  try {
    const singlePromo = await Promo_Code.findByPk(req.params.id, {
      include: Order,
    });
    res.json(singlePromo);
  } catch (e) {
    console.error(chalk.bgRed('BACKEND ISSUE GETTING PROMO_CODES'));
    next(e);
  }
});

router.post('/', async (req, res, next) => {
  try {
    const [newPromo, wasCreated] = await Promo_Code.findOrCreate({
      where: { name: req.body.name },
      defaults: req.body,
    });
    if (!wasCreated) return res.status(409).send('Promo already exists');
    res.status(201).json(newPromo);
  } catch (e) {
    console.error(chalk.bgRed('BACKEND ISSUE ADDING PROMO_CODE'));
    next(e);
  }
});

router.put('/:id', async (req, res, next) => {
  try {
    const promo = await Promo_Code.findByPk(req.params.id);
    if (!promo) return res.status(404).send('No promo to update!');
    const updatedPromo = await promo.update(req.body);
    res.json(updatedPromo);
  } catch (e) {
    console.error(chalk.bgRed('BACKEND ISSUE UPDATING PROMO_CODE'));
    next(e);
  }
});

router.delete('/:id', async (req, res, next) => {
  try {
    const promo = await Promo_Code.findByPk(req.params.id);
    if (!promo) return res.status(404).send('No promo to delete!');
    await promo.destroy();
    res.json(promo);
  } catch (e) {
    console.error(chalk.bgRed('BACKEND ISSUE DELETING PROMO_CODE'));
    next(e);
  }
});

module.exports = router;
