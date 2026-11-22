require('dotenv').config();

const express = require('express');
const cors = require('cors');
const productRoutes = require('./routes/productRoutes');
const { requestLogger } = require('./middlewares/requestLogger');
const { notFoundHandler } = require('./middlewares/notFoundHandler');
const { errorHandler } = require('./middlewares/errorHandler');

const app = express();
const port = process.env.PORT || 3000;

const allowedOrigins = (
  process.env.FRONTEND_ORIGIN ||
  'http://localhost:5173,http://127.0.0.1:5173,http://localhost:4173,http://127.0.0.1:4173'
)
  .split(',')
  .map((origin) => origin.trim());

app.use(cors({ origin: allowedOrigins }));
app.use(express.json());
app.use(requestLogger);

app.use('/products', productRoutes);

app.use(notFoundHandler);
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server berjalan di http://localhost:${port}`);
});
