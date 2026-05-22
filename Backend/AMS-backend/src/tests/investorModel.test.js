const { findInvestor } = require("../models/investorModel");

test("Try testing the valid investor", () => {
  return findInvestor("INV001").then((data) => {
    console.log(`Testing mock data : ${data}`);
    expect(data).not.toBeNull();
    expect(data.first_name).not.toBeNull();
  });
});

test("Try testing the valid async investor", async () => {
  data = await findInvestor("INV001");

  console.log(`Testing mock data : ${JSON.stringify(data)}`);
  expect(data).not.toBeNull();
  expect(data.first_name).not.toBeNull();
});
