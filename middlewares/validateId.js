const validateId = (req, res, next) => {
  const id = Number(req.params.id);

  if (!Number.isInteger(id) || id < 1) {
    return res.status(400).json({
      message: 'Validasi gagal: ID harus berupa bilangan bulat positif',
    });
  }

  next();
};

module.exports = { validateId };
