require("./middleware/telemetry");
const express = require("express");
const cors = require("cors");
const { tracer } = require("./middleware/telemetry");
const dotenv = require("dotenv");
const rateLimit = require("express-rate-limit");

const limiter = rateLimit({
  windowMs: 60 * 1000,
  max: 2,
  message: {
    error: "Too many requests",
  },
  standardHeaders: true,
});

dotenv.config();
const {
  generateAccessToken,
  generateRefreshToken,
  verifyToken,
} = require("./authManager");
const loggerMiddlware = require("./middleware/loggerMiddleware");
const app = express();

app.use(express.json());
app.use(cors());
app.use(loggerMiddlware);
app.use(limiter);
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
  const span = tracer.startSpan("Authorization tracer");
  const { authorization } = request.headers;
  span.setAttribute("user.token", authorization);
  // console.log(`Token : ${authorization}`)

  if (authorization) {
    span.setAttribute("user.tokenPassed", true);
    try {
      const payload = verifyToken(authorization, "access");
      span.setAttribute("user.payload", JSON.stringify(payload));
      span.setStatus(200);
      next();
    } catch (e) {
      span.recordException(e);
      response.status(401).send("Invalid token");
    } finally {
      span.end();
    }
  } else {
    response.status(401).send("Token not found");
  }
}
