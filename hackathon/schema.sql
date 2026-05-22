-- Shared database for both mock backends (equity + mutual fund)
--
-- Setup:
--   createdb wealth_hackathon
--   psql -d wealth_hackathon -f schema.sql

-- Re-run safe (drops existing tables)
DROP TABLE IF EXISTS equity_refresh_tokens CASCADE;
DROP TABLE IF EXISTS equity_transactions CASCADE;
DROP TABLE IF EXISTS equity_watchlist CASCADE;
DROP TABLE IF EXISTS equity_holdings CASCADE;
DROP TABLE IF EXISTS equity_market_prices CASCADE;
DROP TABLE IF EXISTS mf_transactions CASCADE;
DROP TABLE IF EXISTS mf_sips CASCADE;
DROP TABLE IF EXISTS mf_customer_funds CASCADE;
DROP TABLE IF EXISTS equity_users CASCADE;
DROP TABLE IF EXISTS mf_customers CASCADE;
DROP TABLE IF EXISTS mf_schemes CASCADE;

-- =============================================================================
-- EQUITY SERVICE TABLES (Server 1)
-- =============================================================================

CREATE TABLE equity_users (
  investor_id     VARCHAR(20) PRIMARY KEY,
  full_name       VARCHAR(100) NOT NULL,
  email           VARCHAR(150) NOT NULL UNIQUE,
  pan_number      VARCHAR(10) NOT NULL,
  demat_account   VARCHAR(20) NOT NULL,
  password_hash   VARCHAR(255) NOT NULL,
  created_at      TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE equity_holdings (
  id                  SERIAL PRIMARY KEY,
  investor_id         VARCHAR(20) NOT NULL REFERENCES equity_users(investor_id),
  stock_symbol        VARCHAR(20) NOT NULL,
  quantity            NUMERIC(12, 2) NOT NULL,
  avg_buy_price       NUMERIC(12, 2) NOT NULL,
  current_market_price NUMERIC(12, 2) NOT NULL,
  exchange            VARCHAR(10) NOT NULL DEFAULT 'NSE',
  updated_at          TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE equity_transactions (
  id                SERIAL PRIMARY KEY,
  investor_id       VARCHAR(20) NOT NULL REFERENCES equity_users(investor_id),
  stock_symbol      VARCHAR(20) NOT NULL,
  transaction_type  VARCHAR(10) NOT NULL,
  quantity          NUMERIC(12, 2) NOT NULL,
  price             NUMERIC(12, 2) NOT NULL,
  exchange          VARCHAR(10) NOT NULL DEFAULT 'NSE',
  realized_gain     NUMERIC(12, 2),
  executed_at       TIMESTAMPTZ NOT NULL
);

CREATE TABLE equity_watchlist (
  id            SERIAL PRIMARY KEY,
  investor_id   VARCHAR(20) NOT NULL REFERENCES equity_users(investor_id),
  stock_symbol  VARCHAR(20) NOT NULL,
  added_at      TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE (investor_id, stock_symbol)
);

CREATE TABLE equity_market_prices (
  stock_symbol          VARCHAR(20) PRIMARY KEY,
  company_name          VARCHAR(100) NOT NULL,
  current_price         NUMERIC(12, 2) NOT NULL,
  day_change_percent    NUMERIC(8, 4) NOT NULL,
  exchange              VARCHAR(10) NOT NULL DEFAULT 'NSE',
  updated_at            TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE equity_refresh_tokens (
  id            SERIAL PRIMARY KEY,
  investor_id   VARCHAR(20) NOT NULL REFERENCES equity_users(investor_id),
  token         VARCHAR(500) NOT NULL UNIQUE,
  expires_at    TIMESTAMPTZ NOT NULL,
  created_at    TIMESTAMPTZ DEFAULT NOW()
);

-- =============================================================================
-- MUTUAL FUND SERVICE TABLES (Server 2)
-- =============================================================================

CREATE TABLE mf_customers (
  customer_ref    VARCHAR(20) PRIMARY KEY,
  full_name       VARCHAR(100) NOT NULL,
  email           VARCHAR(150) NOT NULL,
  pan_number      VARCHAR(10) NOT NULL,
  folio_number    VARCHAR(30) NOT NULL,
  created_at      TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE mf_schemes (
  scheme_code     VARCHAR(20) PRIMARY KEY,
  scheme_name     VARCHAR(150) NOT NULL,
  amc_name        VARCHAR(100) NOT NULL,
  fund_category   VARCHAR(50) NOT NULL,
  risk_category   VARCHAR(30) NOT NULL,
  nav_value       NUMERIC(12, 4) NOT NULL,
  nav_date        DATE NOT NULL
);

CREATE TABLE mf_customer_funds (
  id              SERIAL PRIMARY KEY,
  customer_ref    VARCHAR(20) NOT NULL REFERENCES mf_customers(customer_ref),
  scheme_code     VARCHAR(20) NOT NULL REFERENCES mf_schemes(scheme_code),
  units           NUMERIC(14, 4) NOT NULL,
  invested_amount NUMERIC(14, 2) NOT NULL,
  current_value   NUMERIC(14, 2) NOT NULL,
  investment_date DATE NOT NULL
);

CREATE TABLE mf_sips (
  id              SERIAL PRIMARY KEY,
  customer_ref    VARCHAR(20) NOT NULL REFERENCES mf_customers(customer_ref),
  scheme_code     VARCHAR(20) NOT NULL REFERENCES mf_schemes(scheme_code),
  sip_amount      NUMERIC(12, 2) NOT NULL,
  sip_status      VARCHAR(20) NOT NULL,
  start_date      DATE NOT NULL,
  next_due_date   DATE
);

CREATE TABLE mf_transactions (
  id                SERIAL PRIMARY KEY,
  customer_ref      VARCHAR(20) NOT NULL REFERENCES mf_customers(customer_ref),
  scheme_code       VARCHAR(20) NOT NULL REFERENCES mf_schemes(scheme_code),
  transaction_type  VARCHAR(20) NOT NULL,
  amount            NUMERIC(14, 2) NOT NULL,
  units             NUMERIC(14, 4),
  redemption_status VARCHAR(30),
  executed_at       TIMESTAMPTZ NOT NULL
);

-- =============================================================================
-- SEED DATA
-- Password for all equity users: password123
-- =============================================================================

INSERT INTO equity_users (investor_id, full_name, email, pan_number, demat_account, password_hash) VALUES
  ('INV1001', 'Rahul Sharma',   'rahul.sharma@example.com',   'ABCDE1234F', 'DMAT1001001', '$2a$10$QrXysUhm5dwIFokVMrFAAOtZjs8rR6gnc4Sa22w22YasPJO5.H6ZC'),
  ('INV1002', 'Priya Reddy',    'priya.reddy@example.com',    'BCDEF2345G', 'DMAT1001002', '$2a$10$QrXysUhm5dwIFokVMrFAAOtZjs8rR6gnc4Sa22w22YasPJO5.H6ZC'),
  ('INV1003', 'Arjun Mehta',    'arjun.mehta@example.com',    'CDEFG3456H', 'DMAT1001003', '$2a$10$QrXysUhm5dwIFokVMrFAAOtZjs8rR6gnc4Sa22w22YasPJO5.H6ZC'),
  ('INV1004', 'Sneha Iyer',     'sneha.iyer@example.com',     'DEFGH4567I', 'DMAT1001004', '$2a$10$QrXysUhm5dwIFokVMrFAAOtZjs8rR6gnc4Sa22w22YasPJO5.H6ZC'),
  ('INV1005', 'Karthik Varma',  'karthik.varma@example.com',  'EFGHI5678J', 'DMAT1001005', '$2a$10$QrXysUhm5dwIFokVMrFAAOtZjs8rR6gnc4Sa22w22YasPJO5.H6ZC');

INSERT INTO equity_market_prices (stock_symbol, company_name, current_price, day_change_percent) VALUES
  ('RELIANCE',   'Reliance Industries',  2850.50,  1.25),
  ('TCS',        'Tata Consultancy',     3850.00,  0.85),
  ('INFY',       'Infosys',              1520.75, -0.45),
  ('HDFCBANK',   'HDFC Bank',            1680.20,  1.10),
  ('ICICIBANK',  'ICICI Bank',            980.40,  0.65),
  ('SBIN',       'State Bank of India',   620.30,  1.55),
  ('BHARTIARTL', 'Bharti Airtel',        1180.00,  2.10),
  ('ITC',        'ITC Limited',           420.15, -0.30),
  ('LT',         'Larsen & Toubro',      3450.80,  0.95),
  ('ASIANPAINT', 'Asian Paints',         2980.60, -0.75);

INSERT INTO equity_holdings (investor_id, stock_symbol, quantity, avg_buy_price, current_market_price, exchange) VALUES
  ('INV1001', 'RELIANCE',   50,  2700.00, 2850.50, 'NSE'),
  ('INV1001', 'TCS',        30,  3600.00, 3850.00, 'NSE'),
  ('INV1001', 'INFY',       100, 1400.00, 1520.75, 'NSE'),
  ('INV1002', 'HDFCBANK',   75,  1550.00, 1680.20, 'NSE'),
  ('INV1002', 'ICICIBANK',  120,  900.00,  980.40, 'NSE'),
  ('INV1003', 'SBIN',       200,  550.00,  620.30, 'NSE'),
  ('INV1003', 'BHARTIARTL', 40,  1050.00, 1180.00, 'NSE'),
  ('INV1004', 'ITC',        500,  380.00,  420.15, 'NSE'),
  ('INV1004', 'LT',         15,  3200.00, 3450.80, 'NSE'),
  ('INV1005', 'ASIANPAINT', 25,  2800.00, 2980.60, 'NSE'),
  ('INV1005', 'RELIANCE',   20,  2750.00, 2850.50, 'BSE');

INSERT INTO equity_transactions (investor_id, stock_symbol, transaction_type, quantity, price, exchange, realized_gain, executed_at) VALUES
  ('INV1001', 'RELIANCE', 'BUY',  50, 2700.00, 'NSE', NULL,    '2024-01-15 10:30:00+05:30'),
  ('INV1001', 'TCS',      'BUY',  30, 3600.00, 'NSE', NULL,    '2024-02-10 11:15:00+05:30'),
  ('INV1001', 'INFY',     'SELL', 20, 1500.00, 'NSE', 2000.00, '2024-06-20 14:00:00+05:30'),
  ('INV1002', 'HDFCBANK', 'BUY',  75, 1550.00, 'NSE', NULL,    '2024-03-05 09:45:00+05:30'),
  ('INV1003', 'SBIN',     'BUY',  200, 550.00, 'NSE', NULL,    '2024-04-12 10:00:00+05:30');

INSERT INTO equity_watchlist (investor_id, stock_symbol) VALUES
  ('INV1001', 'HDFCBANK'),
  ('INV1001', 'SBIN'),
  ('INV1002', 'RELIANCE'),
  ('INV1003', 'TCS'),
  ('INV1004', 'ASIANPAINT');

-- MF customers map to equity investors (different ID format)
INSERT INTO mf_customers (customer_ref, full_name, email, pan_number, folio_number) VALUES
  ('CUST-1001', 'Rahul Sharma',   'rahul.sharma@example.com',   'ABCDE1234F', 'FOLIO-RS-001'),
  ('CUST-1002', 'Priya Reddy',    'priya.reddy@example.com',    'BCDEF2345G', 'FOLIO-PR-002'),
  ('CUST-1003', 'Arjun Mehta',    'arjun.mehta@example.com',    'CDEFG3456H', 'FOLIO-AM-003'),
  ('CUST-1004', 'Sneha Iyer',     'sneha.iyer@example.com',     'DEFGH4567I', 'FOLIO-SI-004'),
  ('CUST-1005', 'Karthik Varma',  'karthik.varma@example.com',  'EFGHI5678J', 'FOLIO-KV-005');

INSERT INTO mf_schemes (scheme_code, scheme_name, amc_name, fund_category, risk_category, nav_value, nav_date) VALUES
  ('SBI-BLUECHIP',    'SBI Bluechip Fund',                  'SBI Mutual Fund',       'Large Cap',     'Moderate',       68.4521, '2024-12-01'),
  ('AXIS-SMALLCAP',   'Axis Small Cap Fund',                'Axis Mutual Fund',      'Small Cap',     'Very High',      95.2310, '2024-12-01'),
  ('HDFC-FLEXI',      'HDFC Flexi Cap Fund',                'HDFC Mutual Fund',      'Flexi Cap',     'Moderately High', 892.15, '2024-12-01'),
  ('ICICI-TECH',      'ICICI Prudential Technology Fund',   'ICICI Prudential',      'Sectoral',      'Very High',      145.6789, '2024-12-01'),
  ('NIPPON-GROWTH',   'Nippon India Growth Fund',           'Nippon India',          'Mid Cap',       'High',           312.45, '2024-12-01'),
  ('MIRAE-LARGECAP',  'Mirae Asset Large Cap Fund',         'Mirae Asset',           'Large Cap',     'Moderate',       112.89, '2024-12-01'),
  ('PPFAS-FLEXI',     'Parag Parikh Flexi Cap Fund',        'PPFAS Mutual Fund',     'Flexi Cap',     'Moderately High', 78.56, '2024-12-01');

INSERT INTO mf_customer_funds (customer_ref, scheme_code, units, invested_amount, current_value, investment_date) VALUES
  ('CUST-1001', 'SBI-BLUECHIP',   500.0000,  30000.00,  34226.05, '2023-06-01'),
  ('CUST-1001', 'HDFC-FLEXI',     100.0000,  80000.00,  89215.00, '2023-08-15'),
  ('CUST-1002', 'AXIS-SMALLCAP',  200.0000,  15000.00,  19046.20, '2023-09-01'),
  ('CUST-1003', 'ICICI-TECH',     300.0000,  35000.00,  43703.67, '2024-01-10'),
  ('CUST-1004', 'NIPPON-GROWTH',  150.0000,  40000.00,  46867.50, '2023-11-20'),
  ('CUST-1005', 'PPFAS-FLEXI',    400.0000,  28000.00,  31424.00, '2024-03-01');

INSERT INTO mf_sips (customer_ref, scheme_code, sip_amount, sip_status, start_date, next_due_date) VALUES
  ('CUST-1001', 'SBI-BLUECHIP',  5000.00, 'ACTIVE',   '2023-06-01', '2024-12-05'),
  ('CUST-1001', 'MIRAE-LARGECAP', 3000.00, 'ACTIVE',   '2024-01-01', '2024-12-05'),
  ('CUST-1002', 'AXIS-SMALLCAP', 2500.00, 'PAUSED',   '2023-09-01', NULL),
  ('CUST-1003', 'ICICI-TECH',    10000.00, 'ACTIVE',  '2024-01-10', '2024-12-10'),
  ('CUST-1004', 'NIPPON-GROWTH', 2000.00, 'CANCELLED', '2023-11-20', NULL);

INSERT INTO mf_transactions (customer_ref, scheme_code, transaction_type, amount, units, redemption_status, executed_at) VALUES
  ('CUST-1001', 'SBI-BLUECHIP',  'PURCHASE', 5000.00,  73.0500, NULL,        '2024-11-05 08:00:00+05:30'),
  ('CUST-1001', 'HDFC-FLEXI',    'PURCHASE', 10000.00, 11.2100, NULL,        '2024-11-05 08:00:00+05:30'),
  ('CUST-1002', 'AXIS-SMALLCAP', 'REDEMPTION', 5000.00, 52.5000, 'COMPLETED', '2024-10-15 10:00:00+05:30'),
  ('CUST-1003', 'ICICI-TECH',    'PURCHASE', 10000.00, 68.6000, NULL,        '2024-11-10 09:30:00+05:30'),
  ('CUST-1005', 'PPFAS-FLEXI',   'PURCHASE', 5000.00,  63.6500, NULL,        '2024-11-01 08:00:00+05:30');
