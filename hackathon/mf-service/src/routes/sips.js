const express = require('express');
const { query } = require('../db');

const router = express.Router();

router.get('/:customerId', async (req, res) => {
  try {
    const result = await query(
      `SELECT s.id, s.customer_ref AS "customerRef", s.scheme_code AS "schemeCode",
              sch.scheme_name AS "schemeName", s.sip_amount AS "sipAmount",
              s.sip_status AS "sipStatus", s.start_date AS "startDate", s.next_due_date AS "nextDueDate"
       FROM mf_sips s
       JOIN mf_schemes sch ON sch.scheme_code = s.scheme_code
       WHERE s.customer_ref = $1
       ORDER BY s.id`,
      [req.params.customerId]
    );

    res.json({
      customerRef: req.params.customerId,
      sips: result.rows,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.get('/:customerId/status', async (req, res) => {
  try {
    const result = await query(
      `SELECT sip_status AS "sipStatus", COUNT(*)::int AS count
       FROM mf_sips WHERE customer_ref = $1 GROUP BY sip_status`,
      [req.params.customerId]
    );

    const allSips = await query(
      'SELECT COUNT(*)::int AS total FROM mf_sips WHERE customer_ref = $1',
      [req.params.customerId]
    );

    res.json({
      customerRef: req.params.customerId,
      summary: {
        totalSips: allSips.rows[0].total,
        byStatus: result.rows,
      },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
