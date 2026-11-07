const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  await prisma.product.deleteMany({});
  
  const initialProducts = [
    { id: 1, name: 'Buku', price: 15000 },
    { id: 2, name: 'Pulpen', price: 5000 },
  ];

  for (const product of initialProducts) {
    await prisma.product.upsert({
      where: { id: product.id },
      update: {},
      create: product,
    });
  }

  console.log('Database seeded successfully with initial products from Week 9');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
