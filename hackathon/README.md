# Wealth Hackathon — Mock Backends

Two Node/Express services sharing one PostgreSQL database (`wealth_hackathon`) with **separate table sets** for integration testing.

| Service | Port | Auth | Tables prefix |
|---------|------|------|----------------|
| **equity-service** | 3001 | JWT (login + refresh) | `equity_*` |
| **mf-service** | 3002 | API key + HMAC | `mf_*` |

Same person, different IDs across systems (e.g. `INV1001` ↔ `CUST-1001`).

---

## Prerequisites

- Node.js 18+
- PostgreSQL running locally

---

## 1. Database setup

```bash
createdb wealth_hackathon
psql -d wealth_hackathon -f schema.sql
```

Update connection strings in `.env` files if your Postgres user/password differ.

---

## 2. Equity service (Server 1)

```bash
cd equity-service
cp .env.example .env
npm install
npm start
```

**Health:** `GET http://localhost:3001/health`

**Login** (all users use password `password123`):

```bash
curl -s -X POST http://localhost:3001/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"rahul.sharma@example.com","password":"password123"}'
```

Use `access_token` as `Authorization: Bearer <token>` for protected routes.

| Method | Endpoint |
|--------|----------|
| POST | `/auth/login`, `/auth/refresh` |
| GET | `/users`, `/users/:id` |
| GET | `/portfolio/:investorId`, `/holdings/:investorId` |
| GET | `/transactions/:investorId` (?type=BUY) |
| GET | `/market/top-gainers`, `/market/watchlist/:investorId` |

---

## 3. MF service (Server 2)

```bash
cd mf-service
cp .env.example .env
npm install
npm start
```

**Health:** `GET http://localhost:3002/health` (no auth)

All other routes require headers:

- `x-api-key`
- `x-timestamp` (Unix ms; max 30s old)
- `x-signature` = `HMAC_SHA256(secret, method + endpoint + timestamp + secret)`

Generate headers:

```bash
node scripts/sign-request.js GET /customers
```

Example curl:

```bash
HEADERS=$(node scripts/sign-request.js GET /customers)
curl -s http://localhost:3002/customers \
  -H "x-api-key: $(echo $HEADERS | jq -r '."x-api-key"')" \
  -H "x-timestamp: $(echo $HEADERS | jq -r '."x-timestamp"')" \
  -H "x-signature: $(echo $HEADERS | jq -r '."x-signature"')"
```

| Method | Endpoint |
|--------|----------|
| GET | `/customers`, `/customers/:id/funds` |
| GET | `/sips/:customerId`, `/sips/:customerId/status` |
| GET | `/mf-transactions/:customerId` |
| GET | `/nav/:schemeCode`, `/funds/top-performing` |

---

## Identity mapping (seed data)

| Person | Equity (`investor_id`) | MF (`customerRef`) |
|--------|------------------------|---------------------|
| Rahul Sharma | INV1001 | CUST-1001 |
| Priya Reddy | INV1002 | CUST-1002 |
| Arjun Mehta | INV1003 | CUST-1003 |
| Sneha Iyer | INV1004 | CUST-1004 |
| Karthik Varma | INV1005 | CUST-1005 |

---

## Environment variables

**equity-service/.env**

```
DATABASE_URL=postgresql://postgres:postgres@localhost:5432/wealth_hackathon
JWT_ACCESS_SECRET=...
JWT_REFRESH_SECRET=...
```

**mf-service/.env**

```
DATABASE_URL=postgresql://postgres:postgres@localhost:5432/wealth_hackathon
API_KEY=mf-hackathon-api-key-2024
API_SECRET=mf-hackathon-hmac-secret-2024
```
