const express = require('express');
const { query } = require('../db');

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const result = await query(
      `SELECT customer_ref AS "customerRef", full_name AS "fullName",
              email, pan_number AS "panNumber", folio_number AS "folioNumber", created_at AS "createdAt"
       FROM mf_customers ORDER BY customer_ref`
    );

    res.json({
      success: true,
      customers: result.rows,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.get('/:id/funds', async (req, res) => {
  try {
    const customerResult = await query(
      `SELECT customer_ref AS "customerRef", full_name AS "fullName", folio_number AS "folioNumber"
       FROM mf_customers WHERE customer_ref = $1`,
      [req.params.id]
    );

    if (customerResult.rows.length === 0) {
      return res.status(404).json({ error: 'Customer not found' });
    }

    const fundsResult = await query(
      `SELECT cf.id, cf.scheme_code AS "schemeCode", s.scheme_name AS "schemeName",
              s.amc_name AS "amcName", s.fund_category AS "fundCategory", s.risk_category AS "riskCategory",
              cf.units, cf.invested_amount AS "investedAmount", cf.current_value AS "currentValue",
              cf.investment_date AS "investmentDate", s.nav_value AS "navValue"
       FROM mf_customer_funds cf
       JOIN mf_schemes s ON s.scheme_code = cf.scheme_code
       WHERE cf.customer_ref = $1`,
      [req.params.id]
    );

    res.json({
      customer: customerResult.rows[0],
      fundHoldings: fundsResult.rows,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
