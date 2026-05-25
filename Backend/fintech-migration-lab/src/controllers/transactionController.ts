import type { Request, Response } from "express";
import {
  getAllTransactions,
  getTransactionsByAccount,
  getTransactionById,
} from "../models/transactionModel";
import { sendSuccess, sendNotFound } from "../utility/responseHelper";

export function listTransactions(req: Request, res: Response): void {
  const { accountId } = req.query;
  const data = accountId
    ? getTransactionsByAccount(accountId as string)
    : getAllTransactions();
  sendSuccess(res, data);
}

export function getTransaction(req: Request, res: Response): void {
  const transaction = getTransactionById(req.params.id);
  if (!transaction) {
    sendNotFound(res, "Transaction");
    return;
  }
  sendSuccess(res, transaction);
}
