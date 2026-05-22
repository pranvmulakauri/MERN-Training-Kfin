"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.logger = void 0;
const promises_1 = __importDefault(require("fs/promises"));
const logger = (request, response, next) => {
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
        await promises_1.default.appendFile("./logs/request-logs.txt", JSON.stringify(log) + "\n");
        if (log.status == 200) {
            console.log(JSON.stringify(log));
        }
        else {
            console.error(JSON.stringify(log));
        }
    });
    next();
};
exports.logger = logger;
