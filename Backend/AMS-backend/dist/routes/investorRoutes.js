"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.investorRouter = void 0;
const express = require("express");
const authorize_1 = require("../middleware/authorize");
exports.investorRouter = express.Router();
const investorController_1 = require("../controllers/investorController");
exports.investorRouter.get("/:mobile", investorController_1.getInvestor);
exports.investorRouter.get("/check/:mobile", authorize_1.authMiddleware, investorController_1.checkIfInvestorExists);
exports.investorRouter.post("/:mobile/holdings", authorize_1.authMiddleware, investorController_1.getInvestorHoldings);
exports.investorRouter.get("/:mobile/networth", authorize_1.authMiddleware, investorController_1.getInvestorNetworth);
exports.investorRouter.put('/:mobile/update/profile', (request, response) => {
    //body
});
exports.investorRouter.delete('/:mobile', (request, response) => {
    //body
});
