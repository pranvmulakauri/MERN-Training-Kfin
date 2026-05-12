const express = require("express");
const cors = require('cors')

const dotenv = require("dotenv");
dotenv.config();
const {
  generateAccessToken,
  generateRefreshToken,
  verifyToken,
} = require("./authManager");
const app = express();

app.use(express.json());
app.use(cors())
const users = [
  {
    email: "akshay@gmail.com",
    password: "akshay",
  },
];

//replace this with redis / db
const refreshTokens = [];

app.post("/login", (request, response) => {
  const { email, password } = request.body;

  const user = users.find((u) => u.email == email && u.password == password);
  if (user) {
    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user);
    refreshTokens.push(refreshToken);
    response.send({
      access: accessToken,
      refresh: refreshToken,
    });
  }
});

app.post("/logout", (request, response) => {
  const { token } = request.body;
  refreshTokens = refreshTokens.filter((r) => r == token);
});

app.post("/profile", middleware, (request, response) => {
  response.send("Profile accessed successfuly");
});

app.post("/refresh", (request, response) => {
  const { refresh } = request.body;
  console.log(`Refresh token passed ${refresh}`);
  try {
    const token = refreshTokens.find((r) => r == refresh);
    if (token) {
      const payload = verifyToken(refresh, "refresh");
      console.log(`Payload is still alive ${JSON.stringify(payload)}`);
      const accessToken = generateAccessToken({
        email: payload.email,
        password: payload.password,
      });
      console.log(`Access Token re generated ${accessToken}`);
      return response.json({
        access: accessToken,
      });
    } else {
      response.status(401).send("Re Authenticate");
    }
  } catch (e) {
    console.log(e);
    response.status(401).send("Invalid token");
  }
});

app.listen(4000, (request, response) => {});
function middleware(request, response, next) {
  const { authorization } = request.headers;
  // console.log(`Token : ${authorization}`)

  if (authorization) {
    try {
      const payload = verifyToken(authorization, "access");

      next();
    } catch (e) {
      response.status(401).send("Invalid token");
    }
  } else {
    response.status(401).send("Token not found");
  }
}
