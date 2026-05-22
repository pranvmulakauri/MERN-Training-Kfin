"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = void 0;
const usersModel_1 = require("../models/usersModel");
const authManager_1 = require("../utility/authManager");
const login = (request, response) => {
    const { email, password } = request.body;
    const userData = (0, usersModel_1.loginOp)(email, password);
    if (userData?.status == 200) {
        console.log(userData);
        //sign the JWT
        const token = (0, authManager_1.signJWT)(userData);
        response.send({ ...userData, token: token }).status(200);
        //return the response;
    }
    else {
        response.send({ message: "Invalid not found" }).status(404);
    }
};
exports.login = login;
