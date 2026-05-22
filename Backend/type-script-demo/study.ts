type Address = {
  city: string;
  pincode?: string | null;
};

type KYC = {
  pan: string;
  aadhaar: string;
  verifiedAt?: string | null;
};

type BankAccount = {
  accountNumber: string;
  balance?: number | null;
  branch?: string | null;
};

type Customer = {
  id: string;
  name: string;
  email?: string | null;
  address?: Address | null;
};

type VerifiedCustomer = Customer & KYC & BankAccount;

type UpiPayment = {
  type: "UPI";
  upiId: string;
  amount: number;
};

type CardPayment = {
  type: "CARD";
  cardNumber: string;
  cvv: string;
  amount: number;
};

type LoanPayment = {
  type: "LOAN";
  loanId: string;
  emiAmount: number;
};

type Payment = UpiPayment | CardPayment | LoanPayment;

type ApiSuccess = {
  success: true;
  data: VerifiedCustomer;
};

type ApiFailure = {
  success: false;
  error?: string | null;
};

type ApiResponse = ApiSuccess | ApiFailure | null;

function handleTransaction(payment: Payment, response?: ApiResponse) {
  if (payment.type == "UPI") {
    console.log(payment.amount.toFixed(2));

    console.log(payment.upiId.toUpperCase());
  } else if (payment.type == "CARD") {
    console.log(payment.cardNumber.slice(-4));
  } else if (payment.type == "LOAN") {
    console.log(payment.loanId.toLowerCase());

    console.log(payment.emiAmount.toFixed(2));
  }

  if (response != null) {
    if (response.success == true) {
      console.log(response.data.name.toUpperCase());
      console.log(response.data.balance!.toFixed(2));

      console.log(response.data.branch!.toLowerCase());

      console.log(response.data.verifiedAt!.toUpperCase());

      console.log(response.data.address!.city!.toUpperCase());

      console.log(response.data.address!.pincode!.slice(0, 3));
    } else {
      console.log(response.error!.toUpperCase());
    }
  }
}
