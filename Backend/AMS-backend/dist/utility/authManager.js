"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.signJWT = signJWT;
exports.verifyJWT = verifyJWT;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const secret = "adlkfnaldkfnalkdfmaldfn1234213123123";
function signJWT(payload) {
    try {
        const token = jsonwebtoken_1.default.sign(payload, secret, {
            expiresIn: "30m",
        });
        return token;
    }
    catch (exception) {
        console.log(exception);
        return undefined;
    }
}
function verifyJWT(token) {
    const payload = jsonwebtoken_1.default.verify(token, secret);
    return payload;
}
