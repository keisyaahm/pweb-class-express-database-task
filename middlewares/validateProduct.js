const validateProduct = (req, res, next) => {
  const { name, price, category, stock, sku, description } = req.body ?? {};

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

  if (category !== undefined && (typeof category !== 'string' || category.trim().length === 0)) {
    return res.status(400).json({
      message: 'Validasi gagal: field category wajib berupa teks yang tidak kosong',
    });
  }

  if (stock !== undefined && (typeof stock !== 'number' || !Number.isInteger(stock) || stock < 0)) {
    return res.status(400).json({
      message: 'Validasi gagal: field stock wajib berupa bilangan bulat non-negatif',
    });
  }

  if (sku !== undefined && sku !== null && typeof sku !== 'string') {
    return res.status(400).json({ message: 'Validasi gagal: field sku wajib berupa teks' });
  }

  if (description !== undefined && typeof description !== 'string') {
    return res.status(400).json({
      message: 'Validasi gagal: field description wajib berupa teks',
    });
  }

  next();
};

module.exports = { validateProduct };
