export const users = [
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
import { Payload } from "../utility/authManager";
//check login
export const loginOp = (email:string, password:string) => {
  const user = users.find(
    (u) => u.email == email && u.password == password,
  );
  //generate access token
  if (user != undefined) {
    const userData:Payload = {
      email: user.email,
      status: 200,
      role: user.role

    }
    return userData;
  }
 

};
