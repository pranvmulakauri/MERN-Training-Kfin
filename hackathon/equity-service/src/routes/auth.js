const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const { query } = require('../db');

const router = express.Router();

router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ error: 'email and password are required' });
    }

    const result = await query(
      'SELECT investor_id, email, password_hash, full_name FROM equity_users WHERE email = $1',
      [email]
    );

    if (result.rows.length === 0) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const user = result.rows[0];
    const valid = await bcrypt.compare(password, user.password_hash);
    if (!valid) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const accessToken = jwt.sign(
      { investor_id: user.investor_id, email: user.email },
      process.env.JWT_ACCESS_SECRET,
      { expiresIn: process.env.ACCESS_TOKEN_EXPIRY || '5m' }
    );

    const refreshToken = crypto.randomBytes(40).toString('hex');
    const refreshExpiry = new Date(Date.now() + 30 * 60 * 1000);

    await query(
      'INSERT INTO equity_refresh_tokens (investor_id, token, expires_at) VALUES ($1, $2, $3)',
      [user.investor_id, refreshToken, refreshExpiry]
    );

    res.json({
      access_token: accessToken,
      refresh_token: refreshToken,
      token_type: 'Bearer',
      expires_in: 300,
      investor_id: user.investor_id,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.post('/refresh', async (req, res) => {
  try {
    const { refresh_token } = req.body;
    if (!refresh_token) {
      return res.status(400).json({ error: 'refresh_token is required' });
    }

    const result = await query(
      `SELECT rt.investor_id, rt.expires_at, u.email
       FROM equity_refresh_tokens rt
       JOIN equity_users u ON u.investor_id = rt.investor_id
       WHERE rt.token = $1`,
      [refresh_token]
    );

    if (result.rows.length === 0) {
      return res.status(401).json({ error: 'Invalid refresh token' });
    }

    const row = result.rows[0];
    if (new Date(row.expires_at) < new Date()) {
      await query('DELETE FROM equity_refresh_tokens WHERE token = $1', [refresh_token]);
      return res.status(401).json({ error: 'Refresh token expired' });
    }

    await query('DELETE FROM equity_refresh_tokens WHERE token = $1', [refresh_token]);

    const accessToken = jwt.sign(
      { investor_id: row.investor_id, email: row.email },
      process.env.JWT_ACCESS_SECRET,
      { expiresIn: process.env.ACCESS_TOKEN_EXPIRY || '5m' }
    );

    const newRefresh = crypto.randomBytes(40).toString('hex');
    const refreshExpiry = new Date(Date.now() + 30 * 60 * 1000);
    await query(
      'INSERT INTO equity_refresh_tokens (investor_id, token, expires_at) VALUES ($1, $2, $3)',
      [row.investor_id, newRefresh, refreshExpiry]
    );

    res.json({
      access_token: accessToken,
      refresh_token: newRefresh,
      token_type: 'Bearer',
      expires_in: 300,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
