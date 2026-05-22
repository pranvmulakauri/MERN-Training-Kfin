"use strict";
// value could of multiple different values of same type / different type
/*
payment status = CREATED, REFUND, ERROR, SUCCESS
*/
let paymentStatus = "SUCCESS";
console.log(paymentStatus);
// paymentStatus = {
//   status: "Pass",
//   message: "hello",
// };
console.log(paymentStatus);
function logPaymentMessage() {
    if (paymentStatus == "CREATED") {
        console.log("Payment started");
    }
    else if (paymentStatus == "ERROR") {
        console.log("Payment Failed");
    }
    else if (paymentStatus == "SUCCESS") {
        console.log("Payment success");
    }
}
logPaymentMessage();
