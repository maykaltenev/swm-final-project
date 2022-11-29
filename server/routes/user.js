import { Router } from "express";
import {
  registerUser,
  loginUser,
  logout,
  updateQuizTimer,
  getUserData,
  getUserDatas,
  updateUserQuizResults
} from "../controllers/userControllers.js";
const router = Router();

//http://localhost:5000/user/register
router.post("/register", registerUser);

//http://localhost:5000/user/login
router.post("/login", loginUser);

//http://localhost:5000/user/userData
router.post("/userData", getUserData);

http://localhost:5000/user/userdatas
router.get("/userdatas", getUserDatas)

//http:localhost:5000/user/logout
router.get("/logout", logout);

//http:localhost:5000/user/addTimer
router.patch("/addTimer", updateQuizTimer);
updateUserQuizResults
//http://localhost:5000/user/js/quiz/result
router.post("/js/quiz/result", updateUserQuizResults);
export default router;
