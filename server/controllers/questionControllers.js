import express from 'express';
import { javaScript, react, nodeJs, mongoDB } from '../models/questions.js';
import UserSolution from '../models/userSolutions.js'
import QuizSession from '../models/quizSession.js'
export const createJsQuestions = async (req, res) => {
    console.log(req.body)
    try {
        const createQuestion = await javaScript.create(req.body);
        return res.status(201).json({ message: "Question created", createQuestion });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

export const getAllJSQuestions = async (req, res) => {
    try {
        const javascript = await javaScript.find();
        return res.status(201).json({ message: "JavaScript Questions found", javascript });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};
export const createQuizSession = async (req, res) => {
    const { user, questions, userSolution } = req.body

    try {
        const newQuizSession = await QuizSession.create(
            user,
            questions,
            userSolution
        );
        if (!newQuizSession) return;
        return res.status(200).json({ message: "New Quiz Session Created", newQuizSession });
    } catch (error) {
        return res.send(error.message);
    }
}
export const createUserResponse = async (req, res) => {
    const { answer, user, question } = req.body;
    console.log("answer:", answer, "user:", user, "question:", question)
    try {
        const answerFromTheUser = await UserSolution.findByIdAndUpdate(
            user,
            { $push: { user, userResults: { answer, question } } },
            { new: true }
        );
        console.log(answerFromTheUser)
        if (!answerFromTheUser) return;
        return res.status(200).json({ message: answerFromTheUser });
    } catch (error) {
        return res.send(error.message);
    }
};
