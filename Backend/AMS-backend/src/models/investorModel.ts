import { database } from "../utility/db";

interface AssetItem {
  asset: string;
  quantity: number;
  price: number;
}
interface PortofolioItem {
  portfolioId: string;
  name: string;
  holdings: AssetItem[];
}
interface Investor {
  id: string;
  name: string;
  email: string;
  pan: string;
  mobile: string;
  portfolios: PortofolioItem[];
}

const investors: Investor[] = [
  {
    id: "INV001",
    name: "Rahul Sharma",
    email: "rahul@example.com",
    pan: "ABCDE1234F",
    mobile: "1234567890",
    portfolios: [
      {
        portfolioId: "PF001",
        name: "Equity Growth",
        holdings: [
          { asset: "HDFC Bank", quantity: 10, price: 1500 },
          { asset: "TCS", quantity: 5, price: 3500 },
        ],
      },
    ],
  },
   {
    id: "INV002",
    name: "Anjali Verma",
    email: "anjali@example.com",
    pan: "PQRSX5678Z",
    mobile: "9876543210",

    portfolios: [
      {
        portfolioId: "PF003",
        name: "Tech Focus",
        holdings: [
          { asset: "Wipro", quantity: 15, price: 400 },
          { asset: "Infosys", quantity: 10, price: 1400 },
        ],
      },
    ],
  },
];
// const investors = [
//   {
//     id: "INV001",
//     name: "Rahul Sharma",
//     email: "rahul@example.com",
//     pan: "ABCDE1234F",
//     mobile: "1234567890",

//     portfolios: [
//       {
//         portfolioId: "PF001",
//         name: "Equity Growth",
//         holdings: [
//           { asset: "HDFC Bank", quantity: 10, price: 1500 },
//           { asset: "TCS", quantity: 5, price: 3500 },
//         ],
//       },
//       {
//         portfolioId: "PF002",
//         name: "Balanced Fund",
//         holdings: [
//           { asset: "Infosys", quantity: 8, price: 1400 },
//           { asset: "Reliance", quantity: 3, price: 2500 },
//         ],
//       },
//     ],
//   },

 
// ];

export async function findInvestor(mobile: string) {
  // const data = investors.find((inv) => inv.mobile == mobile);

  const getInvPromise = new Promise((resolve, reject) => {
    database.get(
      `SELECT * from investor where investor_id = '${mobile}'; `,
      (error, data) => {
        if (error) reject(error);
        resolve(data);
      },
    );
  });

  const data = await getInvPromise.catch((e) => {
    console.error(e);
  });
  return data;
}
export function checkInvestorExists(mobile: string) {
  const data = investors.find((inv) => inv.mobile == mobile);
  if (data == undefined) {
    return false;
  } else {
    return true;
  }
}
