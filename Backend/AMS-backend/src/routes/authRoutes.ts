import express from 'express'
export const router = express.Router();
import { login } from '../controllers/authController';

router.post("/login", login);

