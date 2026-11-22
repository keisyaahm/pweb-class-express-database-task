const { PrismaClient } = require('@prisma/client');
const { initialProducts } = require('../data/initialProducts');
const prisma = new PrismaClient();

async function main() {
  await prisma.product.deleteMany({});
  await prisma.product.createMany({ data: initialProducts });
  await prisma.$executeRawUnsafe(
    `SELECT setval(pg_get_serial_sequence('"Product"', 'id'), COALESCE(MAX(id), 1)) FROM "Product"`,
  );

  console.log('Database seeded successfully with 8 inventory products');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
