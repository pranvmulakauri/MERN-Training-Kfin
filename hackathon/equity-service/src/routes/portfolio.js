const express = require('express');
const { query } = require('../db');

const router = express.Router();

function computePnl(holding) {
  const qty = parseFloat(holding.quantity);
  const avg = parseFloat(holding.avg_buy_price);
  const current = parseFloat(holding.current_market_price);
  const unrealized = (current - avg) * qty;
  return {
    ...holding,
    pnl: Number(unrealized.toFixed(2)),
    market_value: Number((current * qty).toFixed(2)),
  };
}

router.get('/:investorId', async (req, res) => {
  try {
    const holdingsResult = await query(
      `SELECT h.*, m.company_name
       FROM equity_holdings h
       LEFT JOIN equity_market_prices m ON m.stock_symbol = h.stock_symbol
       WHERE h.investor_id = $1`,
      [req.params.investorId]
    );

    if (holdingsResult.rows.length === 0) {
      const userCheck = await query(
        'SELECT investor_id FROM equity_users WHERE investor_id = $1',
        [req.params.investorId]
      );
      if (userCheck.rows.length === 0) {
        return res.status(404).json({ error: 'Investor not found' });
      }
    }

    const holdings = holdingsResult.rows.map(computePnl);
    const totalValue = holdings.reduce((sum, h) => sum + h.market_value, 0);
    const totalPnl = holdings.reduce((sum, h) => sum + h.pnl, 0);

    res.json({
      investor_id: req.params.investorId,
      portfolio_summary: {
        total_market_value: Number(totalValue.toFixed(2)),
        total_unrealized_pnl: Number(totalPnl.toFixed(2)),
        holdings_count: holdings.length,
      },
      holdings,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
