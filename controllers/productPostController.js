const prisma = require('../lib/prisma');

const createProduct = async (req, res) => {
  const { name, price } = req.body;
  const product = await prisma.product.create({
    data: { name: name.trim(), price },
  });

  res.status(201).json(product);
};

module.exports = { createProduct };
