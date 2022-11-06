import express from 'express';
import { javaScript, react, nodeJs, mongoDB } from '../models/questions.js';


export const createJsQuestions = async (req, res) => {
    console.log(req.body)
    try {
        const createQuestion = await javaScript.create(req.body);
        return res.status(201).json({ message: "Question created", createQuestion });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};