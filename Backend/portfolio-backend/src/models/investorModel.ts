import {db} from "../utility/dbManager.js"
import {client} from "../utility/pgManager.js"
const investors = [
  {
    mobile: "1231231231",
    name: "Bob",
    email: "bob@gmail.com",
    portfolio: [
      { name: "ICICI MF", price: 40000, quantity: 1000 },
      { name: "IRCTC Stock", price: 3000, quantity: 3000 },
      { name: "Real Estate at VIJ", price: 1000000, quantity: 1 },
    ],
  },
];

const users = [
  {
    email: "akshay@gmail.com",
    password: "akshay",
    role: "investor",
    loggedIn: false,
  },
];

export const invalidTokens:string[] = [];

export const loginUser = (email:string, password:string) => {
  const userIndex = users.findIndex(
    (u) => u.email == email && u.password == password,
  );
  console.log(`User index : ${userIndex}`);
  if (userIndex != -1) {
    users[userIndex] = { ...users[userIndex], loggedIn: true };
  }
  return users[userIndex];
};

export const logoutUser = (email:string, token:string) => {
  const userIndex = users.findIndex(
    (u) => u.email == email && u.loggedIn == true,
  );
  console.log(`User to logout :${JSON.stringify(users[userIndex])}`);
  if (userIndex != -1) {
    users[userIndex] = { ...users[userIndex], loggedIn: false };
    invalidTokens.push(token);
    return true;
  }
  return false;
};
const liabilities = 10000;

function getInvestorFromDB(mobile:string) {
  return new Promise((resolve, reject) => {
    client.query(
      `select * from investor where pancard_no = '${mobile}';                `,
      (err, rows) => {
        if (err) {
          console.log(err)
          reject(err);
        } else {
          //console.log(`Data : ${JSON.stringify(rows)}`);
          resolve(rows.rows);
        }
      },
    );
  });
}

export async function migrateAssets() {
  const migrateDBPromise = new Promise((resolve, reject) => {
    db.serialize(() => {
      db.run("BEGIN TRANSACTION");

      db.run(`
    INSERT INTO portfolio(portfolio_id, investor_id)
    VALUES (301, 'INV001')
  `);

      db.run(`
    INSERT INTO asset(
      id,
      name,
      qty,
      purchase_date,
      unit_value,
      portfolio_id
    )
    VALUES (
      2001,
      'Infosys Shares',
      10,
      '2024-01-01',
      1500,
      301
    )
  `);

      // Intentional FK failure
      db.run(
        `
    INSERT INTO asset(
      id,
      name,
      qty,
      purchase_date,
      unit_value,
      portfolio_id
    )
    VALUES (
      2002,
      'Broken Asset',
      5,
      '2024-01-01',
      1000,
      9999
    )
  `,
        (err) => {
          if (err) {
            console.log("Error occurred");
            console.log(err.message);

            db.run("ROLLBACK");
          } else {
            db.run("COMMIT");
          }
        },
      );
    });
  });

  try {
    await migrateDBPromise;
  } catch (error) {
    console.error(error);
  }
}
function calculateNavfromDB(mobile:string) {
  return new Promise((resolve, reject) => {
    db.get(
      `
      SELECT i.first_name, p.portfolio_id, sum((a.qty * a.unit_value) - 10000) as total_nav
from asset a
JOIN portfolio p on p.portfolio_id = a.portfolio_id
JOIN investor i on i.investor_id = p.investor_id
where i.investor_id  = '${mobile}'
GROUP BY a.portfolio_id;
      `,
      (err, rows) => {
        if (err) {
          reject(err);
        } else {
          console.log(`Data : ${JSON.stringify(rows)}`);
          resolve(rows);
        }
      },
    );
  });
}
export async function fetchInvestorData(mobile:string) {
  try {
    const investor:any = await getInvestorFromDB(mobile);
    return investor;
  } catch (e) {
    console.error(e);
    return undefined;
  }
  // const investor = investors.find((inv) => inv.mobile == mobile);
  // if (investor != undefined) {
  //   return investor;
  // } else {
  //   return undefined;
  // }
}

export async function calculateNAV(mobile:string) {
  const data = await calculateNavfromDB(mobile);

  // const investor = fetchInvestorData(mobile);
  // const portfolio = investor.portfolio;

  // const totalAssets = portfolio.reduce((total, asset) => {
  //   return total + asset.price * asset.quantity;
  // }, 0);

  // let netAssets = totalAssets - liabilities; // broker charges
  // netAssets = netAssets - 20000; // partner royalty
  // return netAssets;
}

// module.exports = {
//   fetchInvestorData,
//   calculateNAV,
//   loginUser,
//   logoutUser,
//   invalidTokens,
//   migrateAssets,
// };
