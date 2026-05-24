import type { Request, Response } from "express";
import { getAllLoans, getLoansByInvestor } from "../models/loanModel";
import { sendSuccess } from "../utility/responseHelper";

export function listLoans(req: Request, res: Response): void {
  const { investorId } = req.query;
  const data = investorId ? getLoansByInvestor(investorId as string) : getAllLoans();
  sendSuccess(res, data);
}
