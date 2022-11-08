import express from 'express';
import { javaScript, react, nodeJs, mongoDB } from '../models/questions.js';
import { userSolution } from '../models/userSolutions.js'

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

export const createUserResponse = async (req, res) => {
    try {
        if (userSolution.findOne({ user }))
            return res.status(201).json({ message: "Question created", createQuestion });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}