const router = require('express').Router();
const chalk = require('chalk');
const { Product, Tag } = require('../../DB');

// GET all prods /api/products
router.get('/', async (req, res, next) => {
  try {
    const allProds = await Product.findAll({ include: Tag });
    res.json(allProds);
  } catch (e) {
    console.error(chalk.bgRed('BACKEND ISSUE FETCHING ALL PRODUCTS'));
    next(e);
  }
});

// GET single product route /api/products/:productId
router.get('/:productId', async (req, res, next) => {
  try {
    const product = await Product.findByPk(req.params.productId, {
      include: Tag,
    });
    if (product === null) {
      return res.status(404).send('Product not found!');
    }
    res.json(product);
  } catch (e) {
    console.error(chalk.bgRed('BACKEND ISSUE FETCHING SINGLE PRODUCT'));
    next(e);
  }
});

// POST (admin only - token auth headers)
// send get request to '/api/auth/:token' passing in token in header

router.post('/', async (req, res, next) => {
  try {
    const [newProduct, wasCreated] = await Product.findOrCreate({
      where: { name: req.body.name },
      defaults: req.body,
    });
    if (!wasCreated) return res.status(409).send('Product already exists');
    res.status(201).json(newProduct);
  } catch (e) {
    console.error(chalk.bgRed('BACKEND ISSUE ADDING NEW PROD'));
    next(e);
  }
});

// PUT (admin only - token auth headers)
router.put('/:id', async (req, res, next) => {
  try {
    const prod = await Product.findByPk(req.params.id);
    if (!prod) return res.status(404).send('No product to update!');
    const updatedProd = await prod.update(req.body);
    res.json(updatedProd);
  } catch (e) {
    console.error(chalk.bgRed('BACKEND ISSUE UPDATING PRODUCT'));
    next(e);
  }
});

// DELETE (admin only - token auth headers)
router.delete('/:id', async (req, res, next) => {
  try {
    const prod = await Product.findByPk(req.params.id);
    if (!prod) return res.status(404).send('No product to delete!');
    await prod.destroy();
    res.json(prod);
  } catch (e) {
    console.error(chalk.bgRed('BACKEND ISSUE DELETING PRODUCT'));
    next(e);
  }
});

module.exports = router;
