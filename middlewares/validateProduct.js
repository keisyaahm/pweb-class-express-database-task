const validateProduct = (req, res, next) => {
  const { name, price } = req.body ?? {};

  if (typeof name !== 'string' || name.trim().length === 0) {
    return res.status(400).json({
      message: 'Validasi gagal: field name wajib diisi dan tidak boleh kosong',
    });
  }

  if (typeof price !== 'number' || !Number.isInteger(price) || price < 0) {
    return res.status(400).json({
      message: 'Validasi gagal: field price wajib berupa bilangan bulat non-negatif',
    });
  }

  next();
};

module.exports = { validateProduct };
