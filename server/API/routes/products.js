const router = require('express').Router();
const chalk = require('chalk');
const { Product } = require('../../DB');

// GET all prods
router.get('/', async (req, res, next) => {
  try {
    const allProds = await Product.findAll();
    res.json(allProds);
  } catch (e) {
    console.error(chalk.bgRed('BACKEND ISSUE FETCHING ALL PRODUCTS'));
    next(err);
  }
});

// Get single product route /api/products/:productId
router.get('/:productId', async (req, res, next) => {
  try {
    const product = await Product.findByPk(req.params.productId);
    res.json(product);
  } catch (e) {
    console.error(chalk.bgRed('BACKEND ISSUE FETCHING PRODUCT'));
    next(e);
  }
});

module.exports = router;
