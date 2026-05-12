const jwt = require("jsonwebtoken");

const secret = "adlkfnaldkfnalkdfmaldfn1234213123123";

function signJWT(payload) {
  try {
    const token = jwt.sign(payload, secret, {
      expiresIn: "30m",
    });
    return token;
  } catch (exception) {
    console.log(exception);
    return undefined;
  }
}

function verifyJWT(token) {
  try {
    const payload = jwt.verify(token, secret);
    return payload;
  } catch (exception) {
    return exception;
  }
}
module.exports = {
  signJWT,
  verifyJWT,
};
