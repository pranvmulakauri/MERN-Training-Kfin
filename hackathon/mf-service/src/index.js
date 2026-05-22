require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { pool } = require('./db');
const { hmacAuthMiddleware } = require('./middleware/hmacAuth');

const customerRoutes = require('./routes/customers');
const sipRoutes = require('./routes/sips');
const mfTransactionRoutes = require('./routes/mfTransactions');
const navRoutes = require('./routes/nav');
const fundRoutes = require('./routes/funds');

const app = express();
const PORT = process.env.PORT || 3002;

app.use(cors());
app.use(express.json());

app.get('/health', async (req, res) => {
  try {
    await pool.query('SELECT 1');
    res.json({ status: 'ok', service: 'mf-service' });
  } catch {
    res.status(503).json({ status: 'error', message: 'Database unavailable' });
  }
});

app.use(hmacAuthMiddleware);

app.use('/customers', customerRoutes);
app.use('/sips', sipRoutes);
app.use('/mf-transactions', mfTransactionRoutes);
app.use('/nav', navRoutes);
app.use('/funds', fundRoutes);

app.use((req, res) => {
  res.status(404).json({ error: 'Not found' });
});

app.listen(PORT, () => {
  console.log(`MF service running on http://localhost:${PORT}`);
});
