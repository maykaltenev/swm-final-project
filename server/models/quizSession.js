import mongoose from "mongoose";
const { Schema, model } = mongoose;
import { QuestionsSchema } from "./questions.js";
import { ResultSchema } from "./result.js";
import { UserSolutionsSchema } from "./userSolutions.js";

export const QuizSessionSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: "user" },
  createdAt: { type: Date, default: Date.now },
  questions: [QuestionsSchema],
  userSolutions: [UserSolutionsSchema],
  result: [ResultSchema]
});

const quizSession = model("quizSession", QuizSessionSchema);

export default quizSession;
