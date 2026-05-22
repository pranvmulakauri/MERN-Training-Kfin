require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { pool } = require('./db');
const { authMiddleware } = require('./middleware/auth');

const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/users');
const portfolioRoutes = require('./routes/portfolio');
const holdingsRoutes = require('./routes/holdings');
const transactionRoutes = require('./routes/transactions');
const marketRoutes = require('./routes/market');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

app.get('/health', async (req, res) => {
  try {
    await pool.query('SELECT 1');
    res.json({ status: 'ok', service: 'equity-service' });
  } catch {
    res.status(503).json({ status: 'error', message: 'Database unavailable' });
  }
});

app.use('/auth', authRoutes);
app.use('/users', authMiddleware, userRoutes);
app.use('/portfolio', authMiddleware, portfolioRoutes);
app.use('/holdings', authMiddleware, holdingsRoutes);
app.use('/transactions', authMiddleware, transactionRoutes);
app.use('/market', authMiddleware, marketRoutes);

app.use((req, res) => {
  res.status(404).json({ error: 'Not found' });
});

app.listen(PORT, () => {
  console.log(`Equity service running on http://localhost:${PORT}`);
});
