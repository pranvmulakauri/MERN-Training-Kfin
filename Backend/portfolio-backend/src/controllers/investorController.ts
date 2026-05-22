import express, { Request, Response } from "express";
import { fetchInvestorData,loginUser,logoutUser,migrateAssets,calculateNAV } from "../models/investorModel.js";
import { signJWT } from "../utility/authManager.js";


export const login = (request:Request,response:Response) => {
   const {email, password} = request.body;
   console.log(`Passed email : ${email} ${password}`)
   const user = loginUser(email,password)
   console.log(`User data ${JSON.stringify(user)}`);
   const token = signJWT({
    email: user.email,
    role: user.role
   })
   return response.json({
      token: token
   })
}

export const logout = (request:Request,response:Response) => {
  const {email,token} = request.body;
  const result = logoutUser(email,token)
  response.send(200)
}

export const getInvestor = async (request:Request, response:Response) => {
  const { mobile } = request.params;
  //add validation
  
   // await migrateAssets();
    const investorProfile = await fetchInvestorData(mobile.toString());
    console.log(`Date time : ${Date.now()}`)
    //console.log(`Investor Profile ${JSON.stringify(investorProfile)}`);
    if (investorProfile != undefined) {
      return response.json({
        "data": investorProfile
      });
    } else {
      return response.status(404).json({
        error: "Investor not found",
      });
    
  }
};

export const checkInvestorExists = (request:Request, response:Response) => {};

export const investorHoldings = (request:Request, response:Response) => {};

export const calculateNav = (request:Request, response:Response) => {
    const {mobile} = request.params
    const nav:any = calculateNAV(mobile.toString())
    return response.send(200).json({
        'nav': nav
    })
};
