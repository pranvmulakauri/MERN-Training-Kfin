const express = require("express");
const app = express();
app.use(express.json());

const users = [];
app.post("/login", (request, response) => {
  const { email, password } = request.body;
  const user = users.find((user) => user.email == email);
  if(user != undefined){
    if(email == user.email && password == user.password){
        return response.send('Login succes')
    }
  }
  else return response.send('Login failed')

});

app.post("/signup", (request, response) => {
  const { email, password } = request.body;
  //check if user exist - reject
  //if new user add it to array
  const user = users.filter((user) => user.email == email);
  if (user != []) {
    return response.send({ message: "User with email already exists" });
  }
  users.push({ email: email, password: password });
  return response.json({ message: "success" });
});

app.get("/investors", (request, response) => {
  //return something
});
