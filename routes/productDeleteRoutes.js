const express = require('express');
const { deleteProduct } = require('../controllers/productDeleteController');
const { validateId } = require('../middlewares/validateId');

const router = express.Router();

router.delete('/:id', validateId, deleteProduct);

module.exports = router;
