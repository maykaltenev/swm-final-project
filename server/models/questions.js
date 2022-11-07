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

<<<<<<< HEAD
const javaScript = model("JavaScript", QuestionsSchema);
const react = model("React", QuestionsSchema);
const nodeJs = model("NodeJs", QuestionsSchema);
const mongoDB = model("MongoDB", QuestionsSchema);
=======
export const javaScript = model("JavaScript", QuestionsSchema);
export const react = model("React", QuestionsSchema);
export const nodeJs = model("NodeJs", QuestionsSchema);
export const mongoDB = model("MongoDB", QuestionsSchema);

>>>>>>> d6ca0a6940aab5a79f34e9ee0c71f88fff50e092

