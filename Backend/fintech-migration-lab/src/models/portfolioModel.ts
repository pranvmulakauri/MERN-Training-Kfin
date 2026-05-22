import type { Portfolio } from "../types";

/** PARTIALLY MIGRATED — Portfolio typed; helper functions still loose */

const portfolios: Portfolio[] = [
  {
    portfolioId: "PF001",
    investorId: "INV001",
    name: "Equity Growth",
    holdings: [
      { symbol: "HDFCBANK", quantity: 10, avgPrice: 1500 },
      { symbol: "TCS", quantity: 5, avgPrice: 3500 },
    ],
  },
  {
    portfolioId: "PF002",
    investorId: "INV001",
    name: "Balanced",
    holdings: [
      { symbol: "INFY", quantity: 8, avgPrice: 1400 },
      { symbol: "RELIANCE", quantity: 3, avgPrice: 2500 },
    ],
  },
  {
    portfolioId: "PF003",
    investorId: "INV002",
    name: "Tech Focus",
    holdings: [
      { symbol: "WIPRO", quantity: 15, avgPrice: 400 },
      { symbol: "INFY", quantity: 10, avgPrice: 1400 },
    ],
  },
];

// TODO: add return type Portfolio[]
export function getPortfoliosByInvestor(investorId) {
  return portfolios.filter((p) => p.investorId === investorId);
}

// TODO: add return type Portfolio | undefined
export function getPortfolioById(portfolioId) {
  return portfolios.find((p) => p.portfolioId === portfolioId);
}

export function getPortfolioValue(portfolioId) {
  const pf = getPortfolioById(portfolioId);
  if (!pf) return 0;
  return pf.holdings.reduce((sum, h) => sum + h.quantity * h.avgPrice, 0);
}
