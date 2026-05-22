const { Router } = require("express");
const { listTransactions } = require("../controllers/transactionController");

const transactionRouter = Router();

transactionRouter.get("/", listTransactions);

module.exports = { transactionRouter };
