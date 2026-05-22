"use strict";
let accountBalance = 45000;
let accountHolder = "12345";
let isKycCompleted = true;
const transaction1 = {
    id: "TXN101",
    amount: 5000,
    type: "credit",
    status: true
};
const userAccount = {
    accountNumber: 987654321,
    holderName: "Akshay",
    balance: 75000,
    transactions: []
};
function deposit(balance, amount) {
    return balance + amount;
}
const updatedBalance = deposit(1000, 500);
function withdraw(balance, amount) {
    if (amount > balance) {
        return "Insufficient Balance";
    }
    return balance - amount;
}
const remainingBalance = withdraw(2000, 5000);
let recentTransactions = [1000, 2000, 3000];
recentTransactions.push(5000);
function sendOtp(phone) {
    console.log("OTP sent to " + phone);
}
sendOtp(9876543210);
let loanInterestRate = 7.5;
console.log(loanInterestRate.toUppercase);
const loan1 = {
    applicant: "Rahul",
    salary: 85000,
    approved: true
};
function calculateEMI(principal, months, interestRate) {
    return (principal * interestRate) / months;
}
const emi = calculateEMI(500000, 60, 8.5);
const stockPrices = {
    company: "OpenAI Finance",
    prices: [100, 200, 300]
};
function checkAccountType(type) {
    if (type === "savings") {
        return true;
    }
    return false;
}
const accountType = checkAccountType("current");
