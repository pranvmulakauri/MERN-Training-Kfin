const express = require("express");
const client = require("./pgManager");
const redisClient = require("./redisClient");
const worker = require("./worker");
const app = express();
app.use(express.json());

worker()
app.get("/health", (request, response) => {});
app.post("/api/investor/create", async (request, response) => {
  const {
    investor_id,
    first_name,
    middle_name,
    last_name,
    pancard_no,
    adhaar_no,
    date_of_birth,
    gender,
    occupation,
    passport_no,
  } = request.body;

//   let investorId = Math.floor(Math.random() * 90000) + 10000;

//   console.log(`Hello`)
//   await redisClient.lPush(
//     `investorQueue`,
//     JSON.stringify({
//       investor_id: investorId,
//       first_name: investor_id,
//       middle_name: investor_id,
//       last_name: last_name,
//       pancard_no: pancard_no,
//       adhaar_no: adhaar_no,
//       date_of_birth: date_of_birth,
//       gender: gender,
//       occupation: occupation,
//       passport_no: passport_no,
//     }),
//   ).catch((e)=> {
//     console.log(`Redis error ${e}`)
//   });
//   response.send('Profile will be created')
  client
    .query(
      `SELECT insert_investor('${investor_id}', '${first_name}',
       '${middle_name}', '${last_name}', '${pancard_no}',
        '${adhaar_no}', '${date_of_birth}',
         '${gender}', '${occupation}', '${passport_no}');`,
    )
    .then(async (value) => {
      console.log(JSON.stringify(value));
      //await client.end();
      response.send(value);
    })
    .catch(async (error) => {
      console.error(`Error ${error}`);
      //await client.end();
      response.json(error);
    });
});

app.listen(4000, () => {
  console.log("Server started");
});
