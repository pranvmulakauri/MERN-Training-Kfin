/**
 * ENTRY POINT — FULLY MIGRATED
 * TypeScript enabled with strict mode.
 */
import express, { Request, Response } from "express";
import { logger } from "./middleware/logger";
import { errorHandler } from "./middleware/errorHandler";
import { investorRouter } from "./routes/investorRoutes";
import { accountRouter } from "./routes/accountRoutes";
import { transactionRouter } from "./routes/transactionRoutes";
import { portfolioRouter } from "./routes/portfolioRoutes";
import { loanRouter } from "./routes/loanRoutes";

const PORT = process.env.PORT || 4100;
const app = express();

app.use(express.json());
app.use(logger);

app.get("/health", (_req: Request, res: Response): void => {
  res.json({ status: "ok", service: "fintech-migration-lab" });
});

// 5 API resource groups
app.use("/api/investors", investorRouter);
app.use("/api/accounts", accountRouter);
app.use("/api/transactions", transactionRouter);
app.use("/api/portfolios", portfolioRouter);
app.use("/api/loans", loanRouter);

app.use(errorHandler);

app.listen(PORT, (): void => {
  console.log(`Fintech API running on http://localhost:${PORT}`);
});

export { app };
