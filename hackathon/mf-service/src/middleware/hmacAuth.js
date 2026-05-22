const crypto = require('crypto');

const MAX_AGE_MS = 30 * 1000;

function hmacAuthMiddleware(req, res, next) {
  const apiKey = req.headers['x-api-key'];
  const timestamp = req.headers['x-timestamp'];
  const signature = req.headers['x-signature'];

  if (!apiKey || !timestamp || !signature) {
    return res.status(401).json({
      error: 'Missing required headers: x-api-key, x-timestamp, x-signature',
    });
  }

  if (apiKey !== process.env.API_KEY) {
    return res.status(401).json({ error: 'Invalid API key' });
  }

  const requestTime = parseInt(timestamp, 10);
  if (Number.isNaN(requestTime)) {
    return res.status(401).json({ error: 'Invalid timestamp' });
  }

  const age = Math.abs(Date.now() - requestTime);
  if (age > MAX_AGE_MS) {
    return res.status(401).json({ error: 'Request timestamp expired (max 30 seconds)' });
  }

  const endpoint = req.originalUrl.split('?')[0];
  const payload = `${req.method}${endpoint}${timestamp}${process.env.API_SECRET}`;
  const expected = crypto
    .createHmac('sha256', process.env.API_SECRET)
    .update(payload)
    .digest('hex');

  if (signature !== expected) {
    return res.status(401).json({ error: 'Invalid signature' });
  }

  next();
}

module.exports = { hmacAuthMiddleware };
