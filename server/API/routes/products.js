const router = require('express').Router();
const chalk = require('chalk');
const { Product, Tag } = require('../../DB');

// GET all prods
router.get('/', async (req, res, next) => {
  try {
    const allProds = await Product.findAll({ include: Tag });
    res.json(allProds);
  } catch (e) {
    console.error(chalk.bgRed('BACKEND ISSUE FETCHING ALL PRODUCTS'));
    next(e);
  }
});

// Get single product route /api/products/:productId
router.get('/:productId', async (req, res, next) => {
  try {
    const product = await Product.findByPk(req.params.productId, {
      include: Tag,
    });
    res.json(product);
  } catch (e) {
    console.error(chalk.bgRed('BACKEND ISSUE FETCHING SINGLE PRODUCT'));
    next(e);
  }
});

module.exports = router;
