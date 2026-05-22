// //test() = define the test case
// // expect() = what to be validated / check the result
// // .toBe() = what to be matched

 const { sum } = require("../controllers/testing");
// describe("Testing Authentication related", () => {
//   test("User login validation", () => {
//     const user = { email: "akshay@gmail.com", password: null };
//     expect(user.email).toBeDefined();
//     expect(user.password).not.toBeNull();
//   });
//   test("User Object matching", () => {
//     const user = { email: "akshay@gmail.com", password: null };
//     expect(user).toEqual({ name: "Bob" });
//   });
// });
// //test if 2 + 2 is 4
test("If 2 + 2 is added result should be 4", () => {
  expect(sum(2, 2)).toBe(4);
});
