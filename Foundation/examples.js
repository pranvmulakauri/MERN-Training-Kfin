const transactions = [
  { id: 1, amount: 500, status: 'SUCCESS' },
  { id: 2, amount: 200, status: 'FAILED' },
  { id: 3, amount: 1000, status: 'SUCCESS' }
];
//1. Display only Failed transactions
// MAP / Filter / For each
const result = transactions.filter((transaction)=>{
    return transaction.status == 'FAILED'
})
console.log(result)

//`1. DISPLAY SUM OF SUCCESS TRANSACTION`
let total = 0;
transactions.forEach((transaction)=> {
    if(transaction.status == "SUCCESS"){
        total = total + transaction.amount
    }
})
console.log(`total transaction count : ${total}`)

// const transactions_list = [
//   { id: 1, amount: 5000 },
//   { id: 2, amount: 15000 },
//   { id: 3, amount: 20000 },
//   { id: 4, amount: 3000 }
// ];

// return all fraud / suspecious transactions based on amount greater than > 12000


//clean the non numeric data
const transactions_list = [100, 200, 'error', null, 500];
//[100,200,500]
const cleanData = transactions_list.filter(item => typeof item === 'number');

console.log(cleanData);




//Convert USD Transactions to INR Transactions
const transactionsUSD = [10, 20, 30];
const rate = 93;
//Filter / Map?
const inr_transactions = transactionsUSD.map((usd)=> usd * rate);
console.log(inr_transactions)