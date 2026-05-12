const users = [
  {
    email: "akshay@gmail.com",
    password: "gmail@akshay.com",
    role: "investor",
  },
  {
    email: "admin@gmail.com",
    password: "gmail@admin.com",
    role: "admin",
  },
  {
    email: "advisor@gmail.com",
    password: "gmail@advisor.com",
    role: "advisor",
  },
  {
    email: "noaccess@gmail.com",
    password: "gmail@noaccess.com",
    role: "user",
  },
];
//check login
const loginOp = (email, password) => {
  const user = users.find(
    (u) => u.email == email && u.password == password,
  );
  //generate access token
  if (user != undefined) {
    return {status:200, email: user.email, role: user.role };
  }
  return {status: 404, message: "User not found"}

};
//check access

module.exports = {
  users,
  loginOp,
};
