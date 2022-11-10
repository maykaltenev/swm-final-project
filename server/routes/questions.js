import { Router } from "express";
import {
    createJsQuestions,
    // getAllJSQuestions,
    updateUserResponse,
    getSessionData,
    createQuizSession,
    createUserResponse
} from "../controllers/questionControllers.js";

const router = Router();

//http://localhost:5000/questions/js
router.post("/js", createJsQuestions);
//http://localhost:5000/questions/js
// router.get("/js", getAllJSQuestions);
http://localhost:5000/questions/js/createQuiz
router.post("/js/createQuiz", createQuizSession);
// http://localhost:5000/questions/js/quiz
router.patch("/js/quiz", createUserResponse);
//http://localhost:5000/questions/js/quiz/:id
router.post("/js/quiz/", getSessionData);
router.patch("/js/quiz/quizAnswer", updateUserResponse);
export default router;
