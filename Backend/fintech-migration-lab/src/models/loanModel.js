/** NOT MIGRATED */

const loans = [
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

function getAllLoans() {
  return loans;
}

function getLoansByInvestor(investorId) {
  return loans.filter((l) => l.investorId === investorId);
}

function getLoanById(loanId) {
  return loans.find((l) => l.loanId === loanId);
}

module.exports = {
  getAllLoans,
  getLoansByInvestor,
  getLoanById,
};
