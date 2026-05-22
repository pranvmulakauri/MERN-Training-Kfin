"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginOp = exports.users = void 0;
exports.users = [
    {
        email: "akshay@gmail.com",
        password: "gmail@akshay.com",
        role: "investor",
    },
    {
        email: "admin@gmail.com",
        password: "gmail@admin.com",
        role: "admin",
    },
    {
        email: "advisor@gmail.com",
        password: "gmail@advisor.com",
        role: "advisor",
    },
    {
        email: "noaccess@gmail.com",
        password: "gmail@noaccess.com",
        role: "user",
    },
];
//check login
const loginOp = (email, password) => {
    const user = exports.users.find((u) => u.email == email && u.password == password);
    //generate access token
    if (user != undefined) {
        const userData = {
            email: user.email,
            status: 200,
            role: user.role
        };
        return userData;
    }
};
exports.loginOp = loginOp;
