// value could of multiple different values of same type / different type
/*
payment status = CREATED, REFUND, ERROR, SUCCESS
*/
interface payment {
  status: string;
  message: string;
}
type payment_status =  "CREATED" | "REFUND" | "ERROR" | "SUCCESS";


let paymentStatus: payment_status = "SUCCESS";
console.log(paymentStatus);


function logPaymentMessage() {
  if (paymentStatus == "CREATED") {
    console.log("Payment started");
  } else if (paymentStatus == "ERROR") {
    console.log("Payment Failed");
  } else if (paymentStatus == "SUCCESS") {
    console.log("Payment success");
  }
}
logPaymentMessage();




interface paymentInfo {
  amount: number;
  status: string;
}

interface auditInfo {
  created_by: string;
}

type Transaction = paymentInfo & auditInfo;

let chatsPay: Transaction = {
  amount: 100,
  status: "failed",
  created_by: "akshay",
};
