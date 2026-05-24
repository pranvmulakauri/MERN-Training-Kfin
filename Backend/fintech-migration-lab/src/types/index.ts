/**
 * STARTER TYPES — extend and use across the codebase during migration.
 * Students: add missing fields, utility types, and strict annotations.
 */

export type InvestorId = string;
export type AccountId = string;
export type TransactionId = string;

export interface Holding {
  symbol: string;
  quantity: number;
  avgPrice: number;
}

export interface Portfolio {
  portfolioId: string;
  investorId: string;
  name: string;
  holdings: Holding[];
}

export interface Investor {
  id: InvestorId;
  name: string;
  email: string;
  pan: string;
  mobile: string;
  kycStatus: "verified" | "pending" | "rejected";
}

export interface Account {
  accountId: string;
  investorId: InvestorId;
  type: "savings" | "demat";
  currency: string;
  balance: number;
  ifsc: string | null;
  status: "active" | "frozen";
}

export interface Transaction {
  txnId: TransactionId;
  accountId: AccountId;
  type: "credit" | "debit";
  amount: number;
  narration: string;
  timestamp: string;
  reference: string;
}

export interface Loan {
  loanId: string;
  investorId: InvestorId;
  product: "personal" | "home";
  principal: number;
  outstanding: number;
  ratePercent: number;
  tenureMonths: number;
  emi: number;
  status: "active" | "closed";
}

// Utility types for response handling
export type InvestorPublic = Omit<Investor, "pan">;
export type AccountUpdate = Partial<Pick<Account, "status" | "balance">>;
export type LoanSummary = Readonly<Pick<Loan, "loanId" | "outstanding" | "emi" | "status">>;
export type AccountBalances = Record<AccountId, number>;

export type ApiSuccess<T> = {
  success: true;
  data: T;
};

export type ApiError = {
  success: false;
  message: string;
};

export type ApiResponse<T> = ApiSuccess<T> | ApiError;
