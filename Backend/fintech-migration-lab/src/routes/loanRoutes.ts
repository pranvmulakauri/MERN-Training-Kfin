import { Router } from "express";
import { listLoans, getLoan } from "../controllers/loanController";

export const loanRouter = Router();

loanRouter.get("/", listLoans);
loanRouter.get("/:id", getLoan);
