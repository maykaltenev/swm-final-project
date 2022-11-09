import mongoose from "mongoose";
const { Schema, model } = mongoose;
import { QuestionsSchema } from "./questions";
import { UserSolutionsSchema } from "./userSolutions";

export const QuizSessionSchema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: "user" },
    createdAt: { type: Date, default: Date.now },
    questions: [QuestionsSchema],
    userSolutions: [UserSolutionsSchema],
})

const quizSession = model("quizSession", QuizSessionSchema);

export default quizSession;
