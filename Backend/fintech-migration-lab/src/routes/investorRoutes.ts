import { Router } from "express";
import { listInvestors, getInvestor } from "../controllers/investorController";

export const investorRouter = Router();

investorRouter.get("/", listInvestors);
investorRouter.get("/:id", getInvestor);
