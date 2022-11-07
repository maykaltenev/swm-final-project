import { Router } from "express";
import {
    createJsQuestions,
    getAllJSQuestions
} from "../controllers/questionControllers.js";

const router = Router();

//http://localhost:5000/question/js
router.post("/js", createJsQuestions);
//http://localhost:5000/question/js
router.get("/js", getAllJSQuestions);


export default router;
