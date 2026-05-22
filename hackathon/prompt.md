Create two independent mock backend services that simulate real-world Indian wealth-tech systems. These services will be consumed by hackathon participants building a Unified Wealth Intelligence Platform.

The services must resemble enterprise-grade financial systems used in India and should intentionally contain:

* inconsistent payload structures,
* fragmented investor identities,
* independent authentication mechanisms,
* partial failures,
* rate limits,
* delayed responses,
* and non-uniform data standards.

The goal is to force participants to design:

* aggregation layers,
* normalized PostgreSQL schemas,
* resilient backend integrations,
* Redis-powered optimizations,
* auditability,
* and operational business logic.

Use realistic Indian financial data patterns throughout the system.

---

# SERVER 1 — EQUITY INVESTMENT SERVICE

## Purpose

Simulates an Indian stock investment and portfolio management platform.

This service represents a modern equity trading platform used for:

* stock holdings,
* equity transactions,
* watchlists,
* portfolio tracking,
* and market activity.

---

# Authentication Mechanism

Use:

* JWT Access Tokens
* Refresh Tokens

### Required APIs

```http
POST /auth/login
POST /auth/refresh
```

### Constraints

* access token expiry: 5 minutes
* refresh token expiry: 30 minutes
* expired tokens return 401
* random token invalidation simulation

---

# Core APIs

## Investor APIs

```http
GET /users
GET /users/:id
```

## Portfolio APIs

```http
GET /portfolio/:investorId
GET /holdings/:investorId
```

## Transaction APIs

```http
GET /transactions/:investorId
GET /transactions/:investorId?type=BUY
```

## Market APIs

```http
GET /market/top-gainers
GET /market/watchlist/:investorId
```

---

# Sample Indian Data

Use realistic NSE/BSE-style data.

### Investors

* Rahul Sharma
* Priya Reddy
* Arjun Mehta
* Sneha Iyer
* Karthik Varma

### Stocks

* RELIANCE
* TCS
* INFY
* HDFCBANK
* ICICIBANK
* SBIN
* BHARTIARTL
* ITC
* LT
* ASIANPAINT

### Data Concepts

* investor_id
* demat_account
* pan_number
* stock_symbol
* quantity
* avg_buy_price
* current_market_price
* pnl
* realized_gain
* transaction_type
* exchange
* executed_at

---

# Intentional System Characteristics

The service should intentionally:

* use snake_case naming
* return paginated responses
* introduce random response delays
* occasionally return HTTP 500 errors
* return inconsistent timestamp formats
* sometimes omit optional fields
* enforce API rate limits

---

# SERVER 2 — MUTUAL FUND & SIP SERVICE

## Purpose

Simulates an Indian mutual fund and SIP management platform.

This service represents a legacy mutual fund ecosystem handling:

* SIP investments,
* NAV tracking,
* redemption requests,
* fund portfolios,
* and scheme performance.

---

# Authentication Mechanism

Use:

* API Key Authentication
* HMAC Signature Validation

---

# Request Requirements

Every request must contain:

```http
x-api-key
x-timestamp
x-signature
```

Signature format:

```text
HMAC_SHA256(
  method + endpoint + timestamp + secret
)
```

---

# Constraints

* requests older than 30 seconds rejected
* invalid signatures rejected
* stricter rate limiting than Server 1

---

# Core APIs

## Customer APIs

```http
GET /customers
GET /customers/:id/funds
```

## SIP APIs

```http
GET /sips/:customerId
GET /sips/:customerId/status
```

## Mutual Fund Transactions

```http
GET /mf-transactions/:customerId
```

## NAV APIs

```http
GET /nav/:schemeCode
GET /funds/top-performing
```

---

# Sample Indian Data

Use realistic Indian mutual fund ecosystem data.

### AMCs / Funds

* SBI Bluechip Fund
* Axis Small Cap Fund
* HDFC Flexi Cap Fund
* ICICI Prudential Technology Fund
* Nippon India Growth Fund
* Mirae Asset Large Cap Fund
* Parag Parikh Flexi Cap Fund

### Data Concepts

* customerRef
* folioNumber
* schemeCode
* schemeName
* navValue
* sipAmount
* sipStatus
* redemptionStatus
* riskCategory
* investmentDate
* fundCategory

---

# Intentional System Characteristics

The service should intentionally:

* use camelCase naming
* return nested payloads
* use different investor identifier formats than Server 1
* introduce timeout simulations
* return inconsistent enum casing
* occasionally return partial responses
* enforce stricter rate limits

---

# Cross-System Inconsistency Requirements

The same investor must exist differently across systems.

Example:

### Server 1

```json
{
  "investor_id": "INV1001"
}
```

### Server 2

```json
{
  "customerRef": "CUST-1001"
}
```

Participants should be forced to solve:

* identity mapping,
* normalization,
* and aggregation challenges.

---

# Failure Simulation Requirements

Introduce:

* random API failures,
* delayed responses,
* stale responses,
* malformed payloads,
* intermittent authorization failures,
* and occasional downstream outages.

The services must NOT behave perfectly.

---

# Scale Expectations

Generate enough mock data to simulate:

* thousands of investors,
* transactions,
* SIPs,
* stock holdings,
* and portfolio activities.

---

# Purpose of These Services

The services are intentionally designed to evaluate participants on:

* backend architecture,
* PostgreSQL normalization,
* Redis usage,
* resilient API integrations,
* audit logging,
* RBAC implementation,
* operational intelligence,
* and scalable system design.

The services should NOT perform aggregation automatically.
