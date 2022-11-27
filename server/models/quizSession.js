import mongoose from "mongoose";
const { Schema, model } = mongoose;
import { QuestionsSchema } from "./questions.js";
import { UserSolutionsSchema } from "./userSolutions.js";

export const QuizSessionSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: "user" },
  createdAt: { type: Date, default: Date.now },
  questions: [QuestionsSchema],
  userSolutions: [UserSolutionsSchema],
  sessionType: { type: String, enum: ["javascript", "react", "nodejs", "mongodb"] },
});

const quizSession = model("quizSession", QuizSessionSchema);

export default quizSession;
