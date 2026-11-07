const express = require('express');
const { createProduct } = require('../controllers/productPostController');
const { validateProduct } = require('../middlewares/validateProduct');

const router = express.Router();

router.post('/', validateProduct, createProduct);

module.exports = router;
