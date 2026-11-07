const { Prisma } = require('@prisma/client');

const errorHandler = (error, req, res, next) => {
  console.error(error);

  if (error instanceof Prisma.PrismaClientKnownRequestError) {
    if (error.code === 'P2025') {
      return res.status(404).json({ message: 'Produk tidak ditemukan' });
    }

    if (error.code === 'P2002') {
      return res.status(409).json({ message: 'Data sudah ada' });
    }
  }

  if (error instanceof SyntaxError && error.status === 400 && 'body' in error) {
    return res.status(400).json({ message: 'Body JSON tidak valid' });
  }

  res.status(500).json({ message: 'Terjadi kesalahan pada server' });
};

module.exports = { errorHandler };
