const router = require('express').Router();
const { Product } = require('../../DB');

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
