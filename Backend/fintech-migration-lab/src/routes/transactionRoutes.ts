import { Router } from "express";
import { listTransactions, getTransaction } from "../controllers/transactionController";

export const transactionRouter = Router();

transactionRouter.get("/", listTransactions);
transactionRouter.get("/:id", getTransaction);
