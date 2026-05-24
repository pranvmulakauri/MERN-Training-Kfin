import type { Portfolio, InvestorId } from "../types";

/** FULLY MIGRATED — Portfolio typed with proper function signatures */

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

export function getPortfoliosByInvestor(investorId: InvestorId): Portfolio[] {
  return portfolios.filter((p) => p.investorId === investorId);
}

export function getPortfolioById(portfolioId: string): Portfolio | undefined {
  return portfolios.find((p) => p.portfolioId === portfolioId);
}

export function getPortfolioValue(portfolioId: string): number {
  const pf = getPortfolioById(portfolioId);
  if (!pf) return 0;
  return pf.holdings.reduce((sum, h) => sum + h.quantity * h.avgPrice, 0);
}
