const { getAllLoans, getLoansByInvestor } = require("../models/loanModel");
const { sendSuccess } = require("../utility/responseHelper");

function listLoans(req, res) {
  const { investorId } = req.query;
  const data = investorId ? getLoansByInvestor(investorId) : getAllLoans();
  sendSuccess(res, data);
}

module.exports = { listLoans };
