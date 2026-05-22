import type { Request, Response, NextFunction } from "express";

/** MIGRATED */
export function logger(req: Request, _res: Response, next: NextFunction): void {
  const time = new Date().toISOString();
  console.log(`[${time}] ${req.method} ${req.originalUrl}`);
  next();
}
