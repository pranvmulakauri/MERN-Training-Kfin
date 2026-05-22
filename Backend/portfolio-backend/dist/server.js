import express from "express";
const app = express();
import { router } from "./routes/investorRoute.js";
app.use(express.json());
app.use('/api/investor', router);
app.listen(5000, () => { });
