import fs from "fs/promises";
import { Request, Response, NextFunction } from "express";
export const logger = (
  request: Request,
  response: Response,
  next: NextFunction,
) => {
  const start = Date.now();
  response.on("finish", async () => {
    const log = {
      level: "info",
      method: request.method,
      url: request.originalUrl,
      status: response.statusCode,
      duration: `${Date.now() - start} ms`,
      timestamp: new Date().toISOString(),
    };
    await fs.appendFile("./logs/request-logs.txt", JSON.stringify(log) + "\n");
    if (log.status == 200) {
      console.log(JSON.stringify(log));
    } else {
      console.error(JSON.stringify(log));
    }
  });
  next();
};
