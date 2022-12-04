import mongoose from "mongoose";

const { Schema, model } = mongoose;

export const QuestionsSchema = new Schema({
  questionText: {
    type: String,
    required: [true, "question is required"],
  },
  options: {
    type: [{ option: { type: String }, isCorrect: Boolean }],
    required: [true, "question should have options"],
  },
  correctOptions: {
    type: Number,
    required: [true, "question should have correct options"],
  },

  difficultyLevel: {
    type: String,
    required: [true, "question should have difficultyLevel"],
    enum: ["beginner", "intermediate", "advanced"],
  },
  explanation: { type: String },
  code: { type: String },
  questionNumber: { type: Number },
  questionType: {
    type: String,
    required: [true, "question should have questionType"],
    enum: ["javascript", "react", "nodejs", "mongodb"],
  },
  inputType: {
    type: String,
    required: [true, "question should have inputType"],
    enum: ["radio", "checkbox", "text"],
  },
  sessionId: { type: Schema.Types.ObjectId, ref: "quizSession" },
});

export const QuestionData = model("questionData", QuestionsSchema);
