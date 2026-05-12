const express = require("express");
const {
  getInvestor,
  checkInvestorExists,
  investorHoldings,
  calculateNav,
  login,
  logout,
} = require("../controllers/investorController");
const { verifyJWT } = require("../utility/authManager");
const { invalidTokens } = require("../models/investorModel");
const router = express.Router();

router.get(
  "/:mobile",
  (request, response, next) => {
    const token = request.headers.authorization;
    try {
        if(invalidTokens.find((t)=> t == token)){
           return response.send("TOken expried")
        }
      const payload = verifyJWT(token);
      if(payload.role == "investor"){

        next()
      }else{
        return response.json("Invalid Permissions")
      }
    } catch (e) {
        response.json("Authorization failed")
    }
  },
  getInvestor,
);
router.get("/check/:mobile", checkInvestorExists);
router.get("/:mobile/holdings", investorHoldings);
router.get("/nav/:mobile", calculateNav);

router.post("/login", login);
router.post("/logout", logout);
module.exports = router;
