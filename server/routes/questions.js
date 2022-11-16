import { Router } from "express";
import {
  createJsQuestions,
  // getAllJSQuestions,
  createQuizSession,
  createUserResponse,
  createResult,
} from "../controllers/questionControllers.js";

const router = Router();

//http://localhost:5000/questions/js
router.post("/js", createJsQuestions);
//http://localhost:5000/questions/js
// router.get("/js", getAllJSQuestions);
//http://localhost:5000/questions/js/createQuiz
router.post("/js/createQuiz", createQuizSession);
// http://localhost:5000/questions/js/quiz
router.patch("/js/quiz", createUserResponse);

//http://localhost:5000/questions/js/quiz/result
router.post("/js/quiz/result", createResult);
export default router;
