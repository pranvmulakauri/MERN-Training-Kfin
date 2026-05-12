const express = require("express");
const router = express.Router();
const authMiddlware = require("../middleware/authorize");
const {
  getInvestor,
  checkIfInvestorExists,
  getInvestorHoldings,
  getInvestorNetworth,
} = require("../controllers/investorController");

router.get("/:mobile", getInvestor);
router.get("/check/:mobile", authMiddlware, checkIfInvestorExists);

router.post("/:mobile/holdings", authMiddlware, getInvestorHoldings);

router.get("/:mobile/networth", authMiddlware, getInvestorNetworth);

router.put('/:mobile/update/profile',(request,response)=> {
  //body
})
router.delete('/:mobile',(request,response)=> {
  //body
})

module.exports = router;
