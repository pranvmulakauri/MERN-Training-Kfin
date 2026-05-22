/**
 * Helper to generate HMAC headers for MF service requests.
 * Usage: node scripts/sign-request.js GET /customers
 */
const crypto = require('crypto');
require('dotenv').config({ path: require('path').join(__dirname, '..', '.env') });

const method = (process.argv[2] || 'GET').toUpperCase();
const endpoint = process.argv[3] || '/customers';
const apiKey = process.env.API_KEY || 'mf-hackathon-api-key-2024';
const secret = process.env.API_SECRET || 'mf-hackathon-hmac-secret-2024';
const timestamp = String(Date.now());

const payload = `${method}${endpoint}${timestamp}${secret}`;
const signature = crypto.createHmac('sha256', secret).update(payload).digest('hex');

console.log(JSON.stringify({
  'x-api-key': apiKey,
  'x-timestamp': timestamp,
  'x-signature': signature,
}, null, 2));
