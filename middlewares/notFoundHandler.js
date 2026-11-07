const notFoundHandler = (req, res) => {
  res.status(404).json({ message: 'Endpoint tidak ditemukan' });
};

module.exports = { notFoundHandler };
