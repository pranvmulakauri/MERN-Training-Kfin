import type { Request, Response } from "express";
import { getAllInvestors, getInvestorById } from "../models/investorModel";
import { sendSuccess, sendNotFound } from "../utility/responseHelper";

/** MIGRATED controller */

export function listInvestors(_req: Request, res: Response): void {
  sendSuccess(res, getAllInvestors());
}

export function getInvestor(req: Request, res: Response): void {
  const investor = getInvestorById(req.params.id);
  if (!investor) {
    sendNotFound(res, "Investor");
    return;
  }
  sendSuccess(res, investor);
}
