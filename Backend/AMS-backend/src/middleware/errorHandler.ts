import { Request, Response, NextFunction } from "express";
export const errorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const errorLog = {
    level: "error",
    message: err.message,
    statusCode: err.statusCode || 500,
    route: req.originalUrl,
    method: req.method,
    timestamp: new Date().toISOString(),
  };

  console.error(JSON.stringify(errorLog));

  res.status(err.statusCode || 500).json({
    message: err.message || "Internal Server Error",
  });
  next()
};
