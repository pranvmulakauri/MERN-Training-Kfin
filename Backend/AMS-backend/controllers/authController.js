const { users, loginOp } = require("../models/usersModel");
const { signJWT } = require("../utility/authManager");
const login = (request, response) => {
  const { email, password } = request.body;
  const userData = loginOp(email, password);
  if (userData.status == 200) {
    console.log(userData)
    //sign the JWT
    const token = signJWT(userData);
    response.send({ ...userData, token: token }).status(200);
    //return the response;
  } else {
    response.send({ message: userData.message }).status(404);
  }
};

module.exports = {
  login,
};
