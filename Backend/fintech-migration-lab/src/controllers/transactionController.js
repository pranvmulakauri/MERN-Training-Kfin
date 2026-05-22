const {
  getAllTransactions,
  getTransactionsByAccount,
} = require("../models/transactionModel");
const { sendSuccess } = require("../utility/responseHelper");

function listTransactions(req, res) {
  const { accountId } = req.query;
  const data = accountId
    ? getTransactionsByAccount(accountId)
    : getAllTransactions();
  sendSuccess(res, data);
}

module.exports = { listTransactions };
