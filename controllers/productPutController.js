const prisma = require('../lib/prisma');
const { getProductPayload } = require('../lib/productPayload');

const updateProduct = async (req, res) => {
  const product = await prisma.product.update({
    where: { id: Number(req.params.id) },
    data: getProductPayload(req.body),
  });

  res.status(200).json(product);
};

module.exports = { updateProduct };
