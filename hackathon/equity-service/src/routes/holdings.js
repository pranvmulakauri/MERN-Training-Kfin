const express = require('express');
const { query } = require('../db');

const router = express.Router();

router.get('/:investorId', async (req, res) => {
  try {
    const result = await query(
      `SELECT investor_id, stock_symbol, quantity, avg_buy_price,
              current_market_price, exchange, updated_at
       FROM equity_holdings WHERE investor_id = $1 ORDER BY stock_symbol`,
      [req.params.investorId]
    );

    res.json({
      investor_id: req.params.investorId,
      data: result.rows,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
