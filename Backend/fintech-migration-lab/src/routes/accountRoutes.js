const { Router } = require("express");
const { listAccounts, getAccount } = require("../controllers/accountController");

const accountRouter = Router();

accountRouter.get("/", listAccounts);
accountRouter.get("/:id", getAccount);

module.exports = { accountRouter };
