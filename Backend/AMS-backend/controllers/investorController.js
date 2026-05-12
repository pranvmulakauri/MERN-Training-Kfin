const { findInvestor } = require("../models/investorModel");
//Logic Layer
const getInvestor = async (request, response,next) => {
  const mobile = request.params.mobile;
  const investor = await findInvestor(mobile);
  console.log(investor);
   if (!investor) {
    const error = new Error("Investor not found");
    error.statusCode = 404;
    return next(error); // ✅ safer in Express
  } else {
    response.send(investor);
  }
};
const checkIfInvestorExists = (request, response) => {
  const mobile = request.params.mobile;
  const investor = findInvestor(mobile);
  console.log(investor);
  if (investor == undefined) {
    response.send(false);
  }
  response.send(true);
};

const getInvestorHoldings = (request, response) => {
  response.send(`Investor ID ${request.params.mobile} holdings`);
};

const getInvestorNetworth = (request, response) => {
  response.send(`Investor ID ${request.params.mobile} networth`);
};

module.exports = {
  getInvestor,
  checkIfInvestorExists,
  getInvestorHoldings,
  getInvestorNetworth,
};
