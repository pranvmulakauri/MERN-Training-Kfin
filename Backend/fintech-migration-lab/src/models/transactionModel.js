/** NOT MIGRATED */

const transactions = [
  {
    txnId: "TXN001",
    accountId: "ACC001",
    type: "credit",
    amount: 50000,
    narration: "SIP payout — Equity Growth Fund",
    timestamp: "2026-05-01T10:30:00Z",
    reference: "REF-SIP-8841",
  },
  {
    txnId: "TXN002",
    accountId: "ACC001",
    type: "debit",
    amount: 15000,
    narration: "UPI — mutual fund purchase",
    timestamp: "2026-05-03T14:22:00Z",
    reference: "REF-UPI-2210",
  },
  {
    txnId: "TXN003",
    accountId: "ACC002",
    type: "debit",
    amount: 125000,
    narration: "Equity buy — HDFCBANK",
    timestamp: "2026-05-10T09:15:00Z",
    reference: "REF-TRD-3392",
  },
  {
    txnId: "TXN004",
    accountId: "ACC003",
    type: "credit",
    amount: 25000,
    narration: "Salary credit",
    timestamp: "2026-05-15T08:00:00Z",
    reference: "REF-NEFT-1102",
  },
];

function getAllTransactions() {
  return transactions;
}

function getTransactionsByAccount(accountId) {
  return transactions.filter((t) => t.accountId === accountId);
}

function getTransactionById(txnId) {
  return transactions.find((t) => t.txnId === txnId);
}

module.exports = {
  getAllTransactions,
  getTransactionsByAccount,
  getTransactionById,
};
