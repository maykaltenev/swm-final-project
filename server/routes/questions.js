import { Router } from "express";
import {
    createJsQuestions,
    getAllJSQuestions,
    createUserResponse
} from "../controllers/questionControllers.js";

const router = Router();

//http://localhost:5000/question/js
router.post("/js", createJsQuestions);
//http://localhost:5000/question/js
router.get("/js", getAllJSQuestions);
// http://localhost:5000/question/js/quiz
router.patch("/js/quiz", createUserResponse);

export default router;
