import type { Loan, InvestorId } from "../types";

const loans: Loan[] = [
  {
    loanId: "LN001",
    investorId: "INV001",
    product: "personal",
    principal: 500000,
    outstanding: 320000,
    ratePercent: 10.5,
    tenureMonths: 36,
    emi: 16250,
    status: "active",
  },
  {
    loanId: "LN002",
    investorId: "INV002",
    product: "home",
    principal: 4500000,
    outstanding: 4100000,
    ratePercent: 8.75,
    tenureMonths: 240,
    emi: 39500,
    status: "active",
  },
  {
    loanId: "LN003",
    investorId: "INV003",
    product: "personal",
    principal: 100000,
    outstanding: 0,
    ratePercent: 12,
    tenureMonths: 12,
    emi: 8885,
    status: "closed",
  },
];

export function getAllLoans(): Loan[] {
  return loans;
}

export function getLoansByInvestor(investorId: InvestorId): Loan[] {
  return loans.filter((l) => l.investorId === investorId);
}

export function getLoanById(loanId: string): Loan | undefined {
  return loans.find((l) => l.loanId === loanId);
}
