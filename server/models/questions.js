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
  mark: {
    type: Number,
    required: [true, "question should have mark"],
  },
  difficultyLevel: { type: String },
  explanation: { type: String },
  code: { type: String },
  questionNumber: { type: Number },
  questionType: {
    type: String,
    enum: ["javascript", "react", "nodejs", "mongodb"],
  },
  inputType: { type: String, enum: ["radio", "checkbox", "text"] },
  sessionId: { type: Schema.Types.ObjectId, ref: "quizSession" },
});

export const javaScript = model("JavaScript", QuestionsSchema);
export const react = model("React", QuestionsSchema);
export const nodeJs = model("NodeJs", QuestionsSchema);
export const mongoDB = model("MongoDB", QuestionsSchema);
