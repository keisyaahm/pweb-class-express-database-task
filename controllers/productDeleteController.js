const prisma = require('../lib/prisma');

const deleteProduct = async (req, res) => {
  await prisma.product.delete({
    where: { id: Number(req.params.id) },
  });

  res.status(204).send();
};

module.exports = { deleteProduct };
