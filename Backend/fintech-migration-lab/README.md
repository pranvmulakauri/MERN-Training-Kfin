# Fintech TypeScript Migration Lab

A **half-migrated** Express API for a wealth-management / banking slice (investors, accounts, transactions, portfolios, loans). Dummy data lives in `src/models/`. Your job is to finish the migration to **full TypeScript** with interfaces, explicit types, and utility types.

## Quick start

```bash
cd fintech-migration-lab
npm install
npm run dev
```

Server: `http://localhost:4100`

## APIs (5 resources)

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/api/investors` | List all investors |
| `GET` | `/api/investors/:id` | Investor by id (`INV001`) |
| `GET` | `/api/accounts` | List accounts; optional `?investorId=INV001` |
| `GET` | `/api/accounts/:id` | Account by id (`ACC001`) |
| `GET` | `/api/transactions` | List txns; optional `?accountId=ACC001` |
| `GET` | `/api/portfolios/investor/:investorId` | Portfolios for investor |
| `GET` | `/api/portfolios/:id` | Portfolio + `estimatedValue` |
| `GET` | `/api/loans` | List loans; optional `?investorId=INV001` |

Also: `GET /health`

## Migration map (starter repo)

| Area | Status |
|------|--------|
| `types/index.ts` | Partial — `Investor`, `Portfolio` done; **Account, Transaction, Loan** TODO |
| `models/investorModel.ts` | Migrated (reference) |
| `models/portfolioModel.ts` | Partial — data typed; **function signatures** TODO |
| `models/accountModel.js` | **Migrate** |
| `models/transactionModel.js` | **Migrate** |
| `models/loanModel.js` | **Migrate** |
| `controllers/investorController.ts` | Migrated (still uses JS helper) |
| `controllers/portfolioController.ts` | Partial |
| `controllers/*.js` (3 files) | **Migrate** |
| `routes/investorRoutes.ts`, `portfolioRoutes.ts` | Migrated |
| `routes/*.js` (3 files) | **Migrate** |
| `middleware/logger.ts` | Migrated |
| `middleware/errorHandler.js` | **Migrate** |
| `utility/responseHelper.js` | **Migrate** — use `ApiResponse<T>` |
| `server.js` | **Migrate** → `server.ts` |

## Assignment tasks

1. **Interfaces** — Define `Account`, `Transaction`, and `Loan` in `src/types/index.ts` (align with dummy data in models).
2. **Rename & convert** — Every `.js` file under `src/` → `.ts` with proper exports (`export` / `import`).
3. **Type all functions** — Parameters, return types, and `Request`/`Response` handlers (use `Request<{ id: string }>` where needed).
4. **Utility types** (required in at least 3 places):
   - `Pick` / `Omit` — e.g. public investor view without `pan`
   - `Partial` — optional update payload (add a stub `PATCH` handler if you like)
   - `Readonly` — immutable loan summary
   - `Record` — map accountId → balance
5. **Strict mode** — Set `"strict": true` in `tsconfig.json` and fix all errors.
6. **Unified responses** — `responseHelper.ts` typed with `ApiResponse<T>`; controllers must satisfy it.
7. **Deliverable** — `npm run build` passes with zero errors; brief note listing files you migrated and utility types you used.

## Sample requests

```bash
curl http://localhost:4100/api/investors
curl http://localhost:4100/api/investors/INV001
curl http://localhost:4100/api/accounts?investorId=INV001
curl http://localhost:4100/api/transactions?accountId=ACC001
curl http://localhost:4100/api/portfolios/investor/INV001
curl http://localhost:4100/api/loans?investorId=INV001
```

## Project layout

```
fintech-migration-lab/
├── src/
│   ├── server.js          ← entry (migrate last)
│   ├── types/index.ts
│   ├── models/            ← dummy in-memory data
│   ├── controllers/
│   ├── routes/
│   ├── middleware/
│   └── utility/
├── package.json
└── tsconfig.json
```

Reference the already-migrated `investorModel.ts` and `logger.ts` when converting sibling files.
