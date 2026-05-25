import type { Request, Response } from "express";
import { getAllLoans, getLoansByInvestor, getLoanById } from "../models/loanModel";
import { sendSuccess, sendNotFound } from "../utility/responseHelper";

export function listLoans(req: Request, res: Response): void {
  const { investorId } = req.query;
  const data = investorId ? getLoansByInvestor(investorId as string) : getAllLoans();
  sendSuccess(res, data);
}

export function getLoan(req: Request, res: Response): void {
  const loan = getLoanById(req.params.id);
  if (!loan) {
    sendNotFound(res, "Loan");
    return;
  }
  sendSuccess(res, loan);
}
