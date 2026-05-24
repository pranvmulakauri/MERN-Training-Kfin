import type { Account, AccountId, InvestorId } from "../types";

const accounts: Account[] = [
  {
    accountId: "ACC001",
    investorId: "INV001",
    type: "savings",
    currency: "INR",
    balance: 250000.5,
    ifsc: "HDFC0001234",
    status: "active",
  },
  {
    accountId: "ACC002",
    investorId: "INV001",
    type: "demat",
    currency: "INR",
    balance: 1845000,
    ifsc: null,
    status: "active",
  },
  {
    accountId: "ACC003",
    investorId: "INV002",
    type: "savings",
    currency: "INR",
    balance: 89000,
    ifsc: "ICIC0005678",
    status: "active",
  },
  {
    accountId: "ACC004",
    investorId: "INV003",
    type: "savings",
    currency: "INR",
    balance: 12000,
    ifsc: "SBIN0009012",
    status: "frozen",
  },
];

export function getAllAccounts(): Account[] {
  return accounts;
}

export function getAccountById(accountId: AccountId): Account | undefined {
  return accounts.find((a) => a.accountId === accountId);
}

export function getAccountsByInvestor(investorId: InvestorId): Account[] {
  return accounts.filter((a) => a.investorId === investorId);
}
