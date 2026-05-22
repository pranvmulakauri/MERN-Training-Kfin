import express from "express";
import {
  getInvestor,
  checkInvestorExists,
  investorHoldings,
  calculateNav,
  login,
  logout,
} from "../controllers/investorController.js";

import { verifyJWT } from "../utility/authManager.js";
import { invalidTokens } from "../models/investorModel.js";

export const router = express.Router();

router.get(
  "/:mobile",
  getInvestor,
);
router.get("/check/:mobile", checkInvestorExists);
router.get("/:mobile/holdings", investorHoldings);
router.get("/nav/:mobile", calculateNav);

router.post("/login", login);
router.post("/logout", logout);

