import type { Request, Response } from "express";
import {
  getAllTransactions,
  getTransactionsByAccount,
} from "../models/transactionModel";
import { sendSuccess } from "../utility/responseHelper";

export function listTransactions(req: Request, res: Response): void {
  const { accountId } = req.query;
  const data = accountId
    ? getTransactionsByAccount(accountId as string)
    : getAllTransactions();
  sendSuccess(res, data);
}
