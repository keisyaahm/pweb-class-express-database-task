const express = require('express');
const {
  getAllProducts,
  getProductById,
} = require('../controllers/productGetController');
const { validateId } = require('../middlewares/validateId');

const router = express.Router();

router.get('/', getAllProducts);
router.get('/:id', validateId, getProductById);

module.exports = router;
