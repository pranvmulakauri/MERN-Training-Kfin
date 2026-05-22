import { Router } from "express";
import {
  listPortfoliosByInvestor,
  getPortfolio,
} from "../controllers/portfolioController";

export const portfolioRouter = Router();

portfolioRouter.get("/investor/:investorId", listPortfoliosByInvestor);
portfolioRouter.get("/:id", getPortfolio);
