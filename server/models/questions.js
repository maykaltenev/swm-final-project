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
  explanation: String,
  image: String,
  questionNumber: Number,
});

const javaScript = model("JavaScript", QuestionsSchema);
const react = model("React", QuestionsSchema);
const nodeJs = model("NodeJs", QuestionsSchema);
const mongoDB = model("MongoDB", QuestionsSchema);

export default question;
