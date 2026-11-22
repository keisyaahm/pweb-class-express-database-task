const express = require('express');
const { createProduct, resetProducts } = require('../controllers/productPostController');
const { validateProduct } = require('../middlewares/validateProduct');

const router = express.Router();

router.post('/', validateProduct, createProduct);
router.post('/reset', resetProducts);

module.exports = router;
