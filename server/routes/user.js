import { Router } from "express";
import {
  registerUser,
  loginUser,
  getAllUsers,
  logout,
} from "../controllers/userControllers.js";
const router = Router();

export default router;
