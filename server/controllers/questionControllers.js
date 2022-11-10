import express from 'express';
import { javaScript, react, nodeJs, mongoDB } from '../models/questions.js';
import UserSolution from '../models/userSolutions.js'
import QuizSession from '../models/quizSession.js'

export const createJsQuestions = async (req, res) => {
    try {
        const createQuestion = await javaScript.create(req.body);
        return res.status(201).json({ message: "Question created", createQuestion });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};
export const getSessionData = async (req, res) => {
    const { sessionId } = req.body
    try {
        const currentSession = await QuizSession.findById(sessionId);
        return res.status(201).json({ message: "Session found", currentSession });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};
export const updateUserResponse = async (req, res) => {
    const { question, answer, sessionId } = req.body
    try {
        const updatedAnswer = await QuizSession.findByIdAndUpdate(sessionId, {
            $set:
            {

            }
        });
        return res.status(201).json({ message: "Session found", currentSession });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

// export const getAllJSQuestions = async (req, res) => {
//     try {
//         const javascript = await javaScript.find();
//         return res.status(201).json({ message: "JavaScript Questions found", javascript });
//     } catch (error) {
//         return res.status(500).json({ message: error.message });
//     }
// };
export const createQuizSession = async (req, res) => {
    const { user, userSolution } = req.body
    //! we create the questions here, add random and limit(20) after more data is added.
    const questions = await javaScript.find();
    try {
        const newQuizSession = await QuizSession.create({
            user,
            questions,
            userSolution
        });
        // console.log(newQuizSession)
        if (!newQuizSession) return;
        return res.status(200).json({ message: "New Quiz Session Created", newQuizSession });
    } catch (error) {
        return res.send(error.message);
    }
}
export const createUserResponse = async (req, res) => {
    const { answer, user, question, sessionId } = req.body;
    // console.log("sessionId:", sessionId, "answer:", answer, "user:", user, "question:", question)
    try {
        // 1. First check the SessionID
        // 2. Check inside the array of responses if the question is in the array
        // 2.1 If yes => assign a new answer
        // 2.2. else => push the question and the answer
        console.log("testing", result)
        const answerFromTheUser = await QuizSession.findByIdAndUpdate(
            sessionId,
            {
                $push: { userSolutions: { question, answer } }
            },
            { new: true }
        );
        // const currentSession = await QuizSession.find({ sessionId }, { userSolutions: { $elemMatch: { question } } });
        // db.inventory.find( { dim_cm: { $elemMatch: { $gt: 22, $lt: 30 } } } )
        // const currentSession = await QuizSession.findById(sessionId).populate('userSolutions').select('question')
        // currentSession.userSolutions.find(item => {
        //     if (String(item.question) == question) {
        //         console.log("True")
        //     } else {
        //         console.log("False")
        //     }
        // })
        // const result = await QuizSession.find({ "_id": sessionId, "userSolutions": { "question": { $eq: question } } });
        // const result = await QuizSession.find({ sessionId }, { userSolutions: { question } })

        if (!answerFromTheUser) return;
        return res.status(200).json({ message: answerFromTheUser });
    } catch (error) {
        return res.send(error.message);
    }
};
