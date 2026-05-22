"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = void 0;
const errorHandler = (err, req, res, next) => {
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
    next();
};
exports.errorHandler = errorHandler;
