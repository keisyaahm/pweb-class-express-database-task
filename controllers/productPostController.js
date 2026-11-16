const prisma = require('../lib/prisma');
const { getProductPayload } = require('../lib/productPayload');
const { initialProducts } = require('../data/initialProducts');

const createProduct = async (req, res) => {
  const product = await prisma.product.create({
    data: getProductPayload(req.body),
  });

  res.status(201).json(product);
};

const resetProducts = async (_req, res) => {
  await prisma.$transaction(async (tx) => {
    await tx.product.deleteMany({});
    await tx.product.createMany({ data: initialProducts });
    await tx.$executeRawUnsafe(
      `SELECT setval(pg_get_serial_sequence('"Product"', 'id'), COALESCE(MAX(id), 1)) FROM "Product"`,
    );
  });

  const products = await prisma.product.findMany({ orderBy: { id: 'asc' } });
  res.status(200).json(products);
};

module.exports = { createProduct, resetProducts };
