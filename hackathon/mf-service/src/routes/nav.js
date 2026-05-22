const express = require('express');
const { query } = require('../db');

const router = express.Router();

router.get('/:schemeCode', async (req, res) => {
  try {
    const result = await query(
      `SELECT scheme_code AS "schemeCode", scheme_name AS "schemeName", amc_name AS "amcName",
              fund_category AS "fundCategory", risk_category AS "riskCategory",
              nav_value AS "navValue", nav_date AS "navDate"
       FROM mf_schemes WHERE scheme_code = $1`,
      [req.params.schemeCode]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Scheme not found' });
    }

    res.json({ nav: result.rows[0] });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
