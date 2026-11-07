const express = require('express');
const productGetRoutes = require('./productGetRoutes');
const productPostRoutes = require('./productPostRoutes');
const productPutRoutes = require('./productPutRoutes');
const productDeleteRoutes = require('./productDeleteRoutes');

const router = express.Router();

router.use(productGetRoutes);
router.use(productPostRoutes);
router.use(productPutRoutes);
router.use(productDeleteRoutes);

module.exports = router;
