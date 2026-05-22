"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getInvestorNetworth = exports.getInvestorHoldings = exports.checkIfInvestorExists = exports.getInvestor = void 0;
const investorModel_1 = require("../models/investorModel");
//Logic Layer
const getInvestor = async (request, response, next) => {
    const mobile = request.params.mobile;
    const investor = await (0, investorModel_1.findInvestor)(mobile);
    console.log(investor);
    if (!investor) {
        const error = new Error("Investor not found");
        //error.statusCode = 404;
        return next(error); // ✅ safer in Express
    }
    else {
        response.send(investor);
    }
};
exports.getInvestor = getInvestor;
const checkIfInvestorExists = (request, response) => {
    const mobile = request.params.mobile;
    const investor = (0, investorModel_1.findInvestor)(mobile);
    console.log(investor);
    if (investor == undefined) {
        response.send(false);
    }
    response.send(true);
};
exports.checkIfInvestorExists = checkIfInvestorExists;
const getInvestorHoldings = (request, response) => {
    response.send(`Investor ID ${request.params.mobile} holdings`);
};
exports.getInvestorHoldings = getInvestorHoldings;
const getInvestorNetworth = (request, response) => {
    response.send(`Investor ID ${request.params.mobile} networth`);
};
exports.getInvestorNetworth = getInvestorNetworth;
