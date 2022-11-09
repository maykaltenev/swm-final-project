import { Router } from "express";
import {
    createJsQuestions,
    getAllJSQuestions,
    createQuizSession,
    createUserResponse
} from "../controllers/questionControllers.js";

const router = Router();

//http://localhost:5000/questions/js
router.post("/js", createJsQuestions);
//http://localhost:5000/questions/js
router.get("/js", getAllJSQuestions);
// http://localhost:5000/questions/js/createQuiz
router.post("/js/createQuiz", createQuizSession);
// http://localhost:5000/questions/js/quiz
router.patch("/js/quiz", createUserResponse);


export default router;
