import express = require('express')
import { authMiddleware } from '../middleware/authorize';
export const investorRouter = express.Router();
import {
  getInvestor,
  checkIfInvestorExists,
  getInvestorHoldings,
  getInvestorNetworth,
} from '../controllers/investorController'

investorRouter.get("/:mobile", getInvestor);
investorRouter.get("/check/:mobile", authMiddleware, checkIfInvestorExists);

investorRouter.post("/:mobile/holdings", authMiddleware, getInvestorHoldings);

investorRouter.get("/:mobile/networth", authMiddleware, getInvestorNetworth);

investorRouter.put('/:mobile/update/profile',(request,response)=> {
  //body
})
investorRouter.delete('/:mobile',(request,response)=> {
  //body
})


