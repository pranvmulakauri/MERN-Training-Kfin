const { request, response } = require("express");
const { fetchInvestorData, loginUser, logoutUser, migrateAssets } = require("../models/investorModel");
const { signJWT } = require("../utility/authManager");


const login = (request,response) => {
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

const logout = (request,response) => {
  const {email,token} = request.body;
  const result = logoutUser(email,token)
  response.send(200)
}

const getInvestor = async (request, response) => {
  const { mobile } = request.params;
  //add validation
  
    await migrateAssets();
    const investorProfile = await fetchInvestorData(mobile);
    console.log(`Investor Profile ${JSON.stringify(investorProfile)}`);
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

const checkInvestorExists = (request, response) => {};

const investorHoldings = (request, response) => {};

const calculateNav = (request, response) => {
    const {mobile} = request.params
    const nav = calculateNav(mobile)
    return response.send(200).json({
        'nav': nav
    })
};


module.exports = {
  checkInvestorExists,
  getInvestor,
  investorHoldings,
  calculateNav,
  login,
  logout
};
