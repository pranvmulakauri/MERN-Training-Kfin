import { Request, Response, NextFunction } from "express";
import {Payload, verifyJWT} from '../utility/authManager'
export const authMiddleware = (
  request: Request,
  response: Response,
  next: NextFunction,
) => {
  const authHeader = request.headers.authorization;
  if (!authHeader) {
    return response.status(401).json({ message: "No Token Passed" });
  }
  //authorization : "Bearer <token>"
  const token = authHeader.split(" ")[1];
  if (!token) {
    return response.status(401).json({ message: "No Token Passed" });
  }

  try {
    console.log(`User passed token : ${token}`);
    const decoded_info:Payload = verifyJWT(token);
    console.log(`Decoded Info = ${JSON.stringify(decoded_info)}`);
    if (
      decoded_info.role == "admin" ||
      decoded_info.role == "investor" ||
      decoded_info.role == "advisor"
    ) {
      next();
    } else {
      return response.status(403).json(decoded_info);
    }
  } catch (error) {
    return response.status(403).json({ message: error });
  }
};
