const {
  getAllAccounts,
  getAccountById,
  getAccountsByInvestor,
} = require("../models/accountModel");
const { sendSuccess, sendNotFound } = require("../utility/responseHelper");

function listAccounts(req, res) {
  const { investorId } = req.query;
  const data = investorId
    ? getAccountsByInvestor(investorId)
    : getAllAccounts();
  sendSuccess(res, data);
}

function getAccount(req, res) {
  const account = getAccountById(req.params.id);
  if (!account) {
    sendNotFound(res, "Account");
    return;
  }
  sendSuccess(res, account);
}

module.exports = { listAccounts, getAccount };
