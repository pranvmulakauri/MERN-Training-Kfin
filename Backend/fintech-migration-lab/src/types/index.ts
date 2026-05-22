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

// TODO (students): define Account, Transaction, Loan interfaces
// Hint: use Pick, Omit, Partial, Readonly where appropriate

export type ApiSuccess<T> = {
  success: true;
  data: T;
};

export type ApiError = {
  success: false;
  message: string;
};

export type ApiResponse<T> = ApiSuccess<T> | ApiError;
