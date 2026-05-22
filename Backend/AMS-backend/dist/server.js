"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const express_1 = __importDefault(require("express"));
const logger_1 = require("./middleware/logger");
const errorHandler_1 = require("./middleware/errorHandler");
const investorRoutes_1 = require("./routes/investorRoutes");
const authRoutes_1 = require("./routes/authRoutes");
exports.app = (0, express_1.default)();
exports.app.use(logger_1.logger);
exports.app.use(errorHandler_1.errorHandler);
exports.app.use(express_1.default.json());
//Define the routes 
exports.app.use('/api/investor', investorRoutes_1.investorRouter);
exports.app.use('/api/auth', authRoutes_1.router);
exports.app.listen(4000, () => {
    console.log('Server is runnign');
});
