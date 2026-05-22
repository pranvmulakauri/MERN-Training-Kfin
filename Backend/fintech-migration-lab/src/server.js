/**
 * ENTRY POINT — NOT MIGRATED
 * Students: rename to server.ts, add types, enable strict mode in tsconfig.
 */
const express = require("express");
const { logger } = require("./middleware/logger");
const { errorHandler } = require("./middleware/errorHandler");
const { investorRouter } = require("./routes/investorRoutes");
const { accountRouter } = require("./routes/accountRoutes");
const { transactionRouter } = require("./routes/transactionRoutes");
const { portfolioRouter } = require("./routes/portfolioRoutes");
const { loanRouter } = require("./routes/loanRoutes");

const PORT = process.env.PORT || 4100;
const app = express();

app.use(express.json());
app.use(logger);

app.get("/health", (_req, res) => {
  res.json({ status: "ok", service: "fintech-migration-lab" });
});

// 5 API resource groups
app.use("/api/investors", investorRouter);
app.use("/api/accounts", accountRouter);
app.use("/api/transactions", transactionRouter);
app.use("/api/portfolios", portfolioRouter);
app.use("/api/loans", loanRouter);

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Fintech API running on http://localhost:${PORT}`);
});

module.exports = { app };
