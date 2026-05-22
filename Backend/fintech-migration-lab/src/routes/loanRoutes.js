const { Router } = require("express");
const { listLoans } = require("../controllers/loanController");

const loanRouter = Router();

loanRouter.get("/", listLoans);

module.exports = { loanRouter };
