import { Router } from "express";
import { listAccounts, getAccount } from "../controllers/accountController";

export const accountRouter = Router();

accountRouter.get("/", listAccounts);
accountRouter.get("/:id", getAccount);
