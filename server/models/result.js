import mongoose from "mongoose";

const { Schema, model } = mongoose;

export const ResultSchema = new Schema({
    result: { type: String },
    passed: { type: Boolean },
    correctAnswers: { type: Number },
    wrongAnswers: { type: Number },
})

const Result = model("result", ResultSchema);

export default Result;
