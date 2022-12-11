import { Router } from "express";
import {
    createJsQuestions,
    // getAllJSQuestions,
    createQuizSession,
    createUserResponse,
    createResult,
    removeJsCollection,
    getAllQuestionsBySession,
    createMixQuizSession
} from "../controllers/questionControllers.js";

const router = Router();

//http://localhost:5000/questions/createallquestions
router.post("/createallquestions", createJsQuestions);
//http://localhost:5000/questions/js
// router.get("/js", getAllJSQuestions);
//http://localhost:5000/questions/createQuiz
router.post("/createQuiz", createQuizSession);
// http://localhost:5000/questions/quiz
router.patch("/quiz", createUserResponse);
//http://localhost:5000/questions/quiz/result
router.post("/quiz/result", createResult);
//http://localhost:5000/questions/js/quiz/delete
router.delete("/js/quiz/delete", removeJsCollection)
// http://localhost:5000/questions/js/sessionID/:id
router.get("/js/sessionID/:id", getAllQuestionsBySession);
//http://localhost:5000/questions/createMixQuiz
router.post("/createMixQuiz", createMixQuizSession);
export default router;
