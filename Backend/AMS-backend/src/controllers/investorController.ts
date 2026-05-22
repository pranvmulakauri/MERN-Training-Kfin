import { findInvestor } from "../models/investorModel";
import { Request,Response,NextFunction } from "express";
//Logic Layer
export const getInvestor = async (request:Request, response:Response,next:NextFunction) => {
  const mobile = request.params.mobile as string;
  const investor = await findInvestor(mobile);
  console.log(investor);
   if (!investor) {
    const error = new Error("Investor not found");
    //error.statusCode = 404;
    return next(error); // ✅ safer in Express
  } else {
    response.send(investor);
  }
};
export const checkIfInvestorExists = (request:Request, response:Response) => {
  const mobile = request.params.mobile as string;
  const investor = findInvestor(mobile);
  console.log(investor);
  if (investor == undefined) {
    response.send(false);
  }
  response.send(true);
};

export const getInvestorHoldings = (request:Request, response:Response) => {
  response.send(`Investor ID ${request.params.mobile} holdings`);
};

export const getInvestorNetworth = (request:Request, response:Response) => {
  response.send(`Investor ID ${request.params.mobile} networth`);
};

