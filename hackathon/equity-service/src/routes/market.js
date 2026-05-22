const express = require('express');
const { query } = require('../db');

const router = express.Router();

router.get('/top-gainers', async (req, res) => {
  try {
    const result = await query(
      `SELECT stock_symbol, company_name, current_price, day_change_percent, exchange, updated_at
       FROM equity_market_prices
       WHERE day_change_percent > 0
       ORDER BY day_change_percent DESC
       LIMIT 10`
    );

    res.json({ data: result.rows });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.get('/watchlist/:investorId', async (req, res) => {
  try {
    const result = await query(
      `SELECT w.stock_symbol, w.added_at, m.company_name, m.current_price, m.day_change_percent
       FROM equity_watchlist w
       LEFT JOIN equity_market_prices m ON m.stock_symbol = w.stock_symbol
       WHERE w.investor_id = $1
       ORDER BY w.stock_symbol`,
      [req.params.investorId]
    );

    res.json({
      investor_id: req.params.investorId,
      watchlist: result.rows,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
