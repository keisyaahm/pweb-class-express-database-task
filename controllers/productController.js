const products = require('../data/products');

const getAllProducts = (req, res) => {
  res.status(200).json(products);
};

const getProductById = (req, res) => {
  const product = products.find((p) => p.id === Number(req.params.id));

  if (!product) {
    return res.status(404).json({ message: 'produk tidak ditemukan' });
  }

  res.status(200).json(product);
};

const createProduct = (req, res) => {
  const { name, price } = req.body;
  const id = products.length ? Math.max(...products.map((p) => p.id)) + 1 : 1;
  const product = { id, name, price };

  products.push(product);
  res.status(201).json(product);
};

module.exports = { getAllProducts, getProductById, createProduct };
