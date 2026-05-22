const express = require('express');
const { query } = require('../db');

const router = express.Router();

router.get('/:customerId', async (req, res) => {
  try {
    const result = await query(
      `SELECT t.id, t.customer_ref AS "customerRef", t.scheme_code AS "schemeCode",
              s.scheme_name AS "schemeName", t.transaction_type AS "transactionType",
              t.amount, t.units, t.redemption_status AS "redemptionStatus",
              t.executed_at AS "executedAt"
       FROM mf_transactions t
       JOIN mf_schemes s ON s.scheme_code = t.scheme_code
       WHERE t.customer_ref = $1
       ORDER BY t.executed_at DESC`,
      [req.params.customerId]
    );

    res.json({
      customerRef: req.params.customerId,
      transactions: result.rows,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
