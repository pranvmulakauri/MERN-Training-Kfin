const express = require('express');
const { query } = require('../db');

const router = express.Router();

router.get('/top-performing', async (req, res) => {
  try {
    const result = await query(
      `SELECT scheme_code AS "schemeCode", scheme_name AS "schemeName", amc_name AS "amcName",
              fund_category AS "fundCategory", risk_category AS "riskCategory",
              nav_value AS "navValue", nav_date AS "navDate"
       FROM mf_schemes
       ORDER BY nav_value DESC
       LIMIT 5`
    );

    res.json({
      topPerformingFunds: result.rows,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
