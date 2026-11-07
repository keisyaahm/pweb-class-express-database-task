const prisma = require('../lib/prisma');

const updateProduct = async (req, res) => {
  const { name, price } = req.body;
  const product = await prisma.product.update({
    where: { id: Number(req.params.id) },
    data: { name: name.trim(), price },
  });

  res.status(200).json(product);
};

module.exports = { updateProduct };
