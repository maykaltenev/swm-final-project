import { Router } from "express";
import {
  createJsQuestions,
  // getAllJSQuestions,
  createQuizSession,
  createUserResponse,
  createResult,
  removeJsCollection,
  getAllQuestionsBySession,
} from "../controllers/questionControllers.js";

const router = Router();

//http://localhost:5000/questions/questionsdata
router.post("/questionsdata", createJsQuestions);
//http://localhost:5000/questions/js
// router.get("/js", getAllJSQuestions);
//localhost:5000/questions/js/createQuiz
http: router.post("/js/createQuiz", createQuizSession);
// http://localhost:5000/questions/js/quiz
router.patch("/js/quiz", createUserResponse);
//http://localhost:5000/questions/js/quiz/result
router.post("/js/quiz/result", createResult);
//http://localhost:5000/questions/js/quiz/delete
router.delete("/js/quiz/delete", removeJsCollection);
// http://localhost:5000/questions/js/sessionID/:id
router.get("/js/sessionID/:id", getAllQuestionsBySession);

export default router;
