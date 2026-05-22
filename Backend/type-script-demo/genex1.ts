// FinTech Use Case:
// Loan Application System
// Correct Solution

interface LoanApplication {
    id: string;
    customerName: string;
    salary: number;
    creditScore: number;
    loanAmount: number;
    status: "pending" | "approved" | "rejected";
}

interface LoanAudit {
    auditId: string;
    performedBy: string;
    timestamp: Date;
}

// PARTIAL
function updateLoanStatus(
    loan: LoanApplication,
    updates: Partial<LoanApplication>
): LoanApplication {

    return {
        ...loan,
        ...updates
    };
}

const loan: LoanApplication = {
    id: "LN101",
    customerName: "Amit",
    salary: 90000,
    creditScore: 780,
    loanAmount: 500000,
    status: "pending"
};

const updatedLoan = updateLoanStatus(loan, {
    status: "approved"
});

console.log(updatedLoan);

// READONLY
const auditLog: Readonly<LoanAudit> = {
    auditId: "AUD1001",
    performedBy: "Admin",
    timestamp: new Date()
};


console.log(auditLog);

// OMIT
type PublicLoanData = Omit<LoanApplication, "creditScore" | "salary">;

const publicLoan: PublicLoanData = {
    id: "LN101",
    customerName: "Amit",
    loanAmount: 500000,
    status: "approved"
};

console.log(publicLoan);

// PICK
type LoanSummary = Pick<LoanApplication, "id" | "loanAmount">;

const summary: LoanSummary = {
    id: "LN500",
    loanAmount: 750000
};

function printLoanSummary(data: LoanSummary): string {

    return `Loan Amount: ₹${data.loanAmount.toFixed(2)}`;
}

console.log(printLoanSummary(summary));