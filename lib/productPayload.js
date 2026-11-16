const getProductPayload = (body = {}) => ({
  name: body.name.trim(),
  category: body.category?.trim() || 'Lainnya',
  price: body.price,
  stock: body.stock ?? 0,
  sku: body.sku?.trim() || null,
  description: body.description?.trim() || '',
});

module.exports = { getProductPayload };
