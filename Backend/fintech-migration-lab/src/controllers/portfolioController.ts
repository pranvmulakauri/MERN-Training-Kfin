import type { Request, Response } from "express";
import {
  getPortfoliosByInvestor,
  getPortfolioById,
  getPortfolioValue,
} from "../models/portfolioModel";
import { sendSuccess, sendNotFound } from "../utility/responseHelper";

/** MIGRATED controller */

export function listPortfoliosByInvestor(req: Request, res: Response): void {
  const portfolios = getPortfoliosByInvestor(req.params.investorId);
  sendSuccess(res, portfolios);
}

export function getPortfolio(req: Request, res: Response): void {
  const portfolio = getPortfolioById(req.params.id);
  if (!portfolio) {
    sendNotFound(res, "Portfolio");
    return;
  }
  const value = getPortfolioValue(req.params.id);
  sendSuccess(res, { ...portfolio, estimatedValue: value });
}
