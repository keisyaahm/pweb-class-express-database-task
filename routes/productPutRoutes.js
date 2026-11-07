const express = require('express');
const { updateProduct } = require('../controllers/productPutController');
const { validateId } = require('../middlewares/validateId');
const { validateProduct } = require('../middlewares/validateProduct');

const router = express.Router();

router.put('/:id', validateId, validateProduct, updateProduct);

module.exports = router;
