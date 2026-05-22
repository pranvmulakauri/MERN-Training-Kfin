import jwt from 'jsonwebtoken';
const secret = "adlkfnaldkfnalkdfmaldfn1234213123123";

export type Payload = {
  status:200,
  email:string,
  role:string
}
export function signJWT(payload:Payload) {
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

export function verifyJWT(token:string):Payload{
  
    const payload = jwt.verify(token, secret);
    return payload as Payload;
}
