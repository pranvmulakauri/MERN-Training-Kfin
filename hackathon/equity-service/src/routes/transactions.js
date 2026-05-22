const express = require('express');
const { query } = require('../db');

const router = express.Router();

router.get('/:investorId', async (req, res) => {
  try {
    const { type } = req.query;
    const params = [req.params.investorId];
    let sql = `
      SELECT id, investor_id, stock_symbol, transaction_type, quantity,
             price, exchange, realized_gain, executed_at
      FROM equity_transactions WHERE investor_id = $1`;

    if (type) {
      params.push(type.toUpperCase());
      sql += ` AND transaction_type = $${params.length}`;
    }

    sql += ' ORDER BY executed_at DESC';

    const result = await query(sql, params);

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
