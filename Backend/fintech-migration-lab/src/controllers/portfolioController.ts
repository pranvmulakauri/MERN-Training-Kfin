import type { Request, Response } from "express";
import {
  getPortfoliosByInvestor,
  getPortfolioById,
  getPortfolioValue,
} from "../models/portfolioModel";
const { sendSuccess, sendNotFound } = require("../utility/responseHelper");

/** PARTIALLY MIGRATED */

export function listPortfoliosByInvestor(req: Request, res: Response) {
  const portfolios = getPortfoliosByInvestor(req.params.investorId);
  sendSuccess(res, portfolios);
}

export function getPortfolio(req: Request, res: Response) {
  const portfolio = getPortfolioById(req.params.id);
  if (!portfolio) {
    sendNotFound(res, "Portfolio");
    return;
  }
  const value = getPortfolioValue(req.params.id);
  sendSuccess(res, { ...portfolio, estimatedValue: value });
}
