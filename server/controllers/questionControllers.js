import express from 'express';
import { JavaScript, React, NodeJS, MongoDB } from './models/questions.js';


export const createJsQuestions = async (req, res) => {
    const { questionText, options, correctOptions,
        mark, difficultyLevel, explanation,
        image, questionNumber } = req.body
    try {
        const createQuestion = await JavaScript.create({
            questionText, options, correctOptions,
            mark, difficultyLevel, explanation,
            image, questionNumber
        });
        return res.status(201).json({ message: "Question created", createQuestion });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};