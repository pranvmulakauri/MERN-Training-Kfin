const dotenv = require("dotenv");
dotenv.config();
const { MongoClient, ServerApiVersion } = require("mongodb");

const uri = `mongodb+srv://akshay:${process.env.password}@backend.bw5roee.mongodb.net/?appName=Backend`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!",
    );
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
//run().catch(console.dir);

async function createInvestor() {
  try {
    await client.connect();
    const db = client.db("MutualFundsDB");
    const investorCollection = db.collection("Investors");

    const data = [
      {
        name: "Ram",
        porfolio: ["Kfintech", "Indian Oil"],
        mobile: "122123",
      },
      {
        name: "Faiz",
        porfolio: ["Kfintech", "Indian Oil"],
        mobile: "12312123123123",
      },
      {
        name: "Alice",
        porfolio: ["Kfintech", "Indian Oil"],
        mobile: "1231123123123",
      },
      {
        name: "Akshay",
        porfolio: ["Kfintech", "Indian Oil"],
        mobile: "1231123223123",
      },
    ];
    const result = await investorCollection.insertMany(data);
    console.log(`Investor Added`);
  } catch (e) {
    console.error(e);
  } finally {
    await client.close();
  }
}

async function fetchData() {
  try {
    await client.connect();
    const db = client.db("MutualFundsDB");
    const fundsCollection = await db.collection("Funds");
    //const data = await fundsCollection.find({"current_nav": {"$lt": 100}}).toArray()

    const data = await fundsCollection
      .find({
        $and: [
          { current_nav: { $gt: 500 } },
          { current_nav: { $lt: 7000 } },
        ],
      })
      .toArray();
    console.log(`Data returned : ${JSON.stringify(data)}`);
  } catch (e) {
    console.error(e);
  } finally {
    await client.close();
  }
}

async function deleteData(){
  try {
    await client.connect();
    const db = client.db("MutualFundsDB");
    const fundsCollection = await db.collection("Funds");
   // const data = await fundsCollection.find({"current_nav": {"$lt": 1000}});
    await fundsCollection.deleteOne({"current_nav": {"$lt": 1000}})

    //console.log(`Data returned : ${JSON.stringify(data)}`);
  } catch (e) {
    console.error(e);
  } finally {
    await client.close();
  }
}
async function main() {
  await deleteData();
}
main();

module.exports = client;
