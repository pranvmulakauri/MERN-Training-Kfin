import { users, loginOp } from "../models/usersModel";
import { Payload, signJWT } from "../utility/authManager";
import { Request, Response } from "express";
export const login = (request: Request, response: Response) => {
  const { email, password } = request.body;
  const userData = loginOp(email, password);
  if (userData?.status == 200) {
    console.log(userData);
    //sign the JWT
    const token = signJWT(userData);
    response.send({ ...userData, token: token }).status(200);
    //return the response;
  } else {
    response.send({ message: "Invalid not found" }).status(404);
  }
};


