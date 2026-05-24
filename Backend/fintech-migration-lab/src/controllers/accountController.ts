import type { Request, Response } from "express";
import {
  getAllAccounts,
  getAccountById,
  getAccountsByInvestor,
} from "../models/accountModel";
import { sendSuccess, sendNotFound } from "../utility/responseHelper";

export function listAccounts(req: Request, res: Response): void {
  const { investorId } = req.query;
  const data = investorId
    ? getAccountsByInvestor(investorId as string)
    : getAllAccounts();
  sendSuccess(res, data);
}

export function getAccount(req: Request, res: Response): void {
  const account = getAccountById(req.params.id);
  if (!account) {
    sendNotFound(res, "Account");
    return;
  }
  sendSuccess(res, account);
}
