import jwt, { JwtPayload } from "jsonwebtoken"

const secret = "adlkfnaldkfnalkdfmaldfn1234213123123";

export function signJWT(payload:any) {
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

export function verifyJWT(token:string|undefined) {
  try {
    const payload:string|JwtPayload = jwt.verify(token!, secret);
    return payload;
  } catch (exception) {
    return exception;
  }
}
