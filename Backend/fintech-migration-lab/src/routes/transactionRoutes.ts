import { Router } from "express";
import { listTransactions } from "../controllers/transactionController";

export const transactionRouter = Router();

transactionRouter.get("/", listTransactions);
