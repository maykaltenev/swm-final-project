import { Router } from "express";
import {
    createJsQuestions
} from "../controllers/questionControllers.js";

const router = Router();

//http://localhost:5000/question/js
router.post("/js", createJsQuestions);

export default router;
