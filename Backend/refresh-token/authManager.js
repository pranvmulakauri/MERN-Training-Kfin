const jwt = require("jsonwebtoken");

function generateAccessToken(payload) {
  return jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: "15s",
  });
}

function generateRefreshToken(payload) {
  return jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET, {
    expiresIn: "7d",
  });
}

function verifyToken(token, type) {
  try {
    if (type == "access") {
      const data = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
      return data
    } else if (type == "refresh") {
     const data = jwt.verify(token, process.env.REFRESH_TOKEN_SECRET);
     return data
    }
  } catch (e) {
    throw e
  }
}
module.exports = {
  generateAccessToken,
  generateRefreshToken,
  verifyToken
};
