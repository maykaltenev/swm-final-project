import mongoose from "mongoose";
const { Schema, model } = mongoose;

export const UserSolutionsSchema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: "user" },
    userResults: [{
        question: { type: Schema.Types.ObjectId, ref: "JavaScript" },
        answer: { type: Schema.Types.ObjectId, ref: "JavaScript" },
    }],
    sessionId: { type: Schema.Types.ObjectId, ref: "quizSession" }

    // question_1: {
    //     question: { type: Schema.Types.ObjectId, ref: "JavaScript" },
    //     answer: { type: String },
    // },
    // question_2: {
    //     question: { type: Schema.Types.ObjectId, ref: "JavaScript" },
    //     answer: { type: String },
    // },
    // question_3: {
    //     question: { type: Schema.Types.ObjectId, ref: "JavaScript" },
    //     answer: { type: String },
    // },
    // question_4: {
    //     question: { type: Schema.Types.ObjectId, ref: "JavaScript" },
    //     answer: { type: String },
    // },
    // question_5: {
    //     question: { type: Schema.Types.ObjectId, ref: "JavaScript" },
    //     answer: { type: String },
    // },
    // question_6: {
    //     question: { type: Schema.Types.ObjectId, ref: "JavaScript" },
    //     answer: { type: String },
    // },
    // question_7: {
    //     question: { type: Schema.Types.ObjectId, ref: "JavaScript" },
    //     answer: { type: String },
    // },
    // question_8: {
    //     question: { type: Schema.Types.ObjectId, ref: "JavaScript" },
    //     answer: { type: String },
    // },
    // question_9: {
    //     question: { type: Schema.Types.ObjectId, ref: "JavaScript" },
    //     answer: { type: String },
    // },
    // question_10: {
    //     question: { type: Schema.Types.ObjectId, ref: "JavaScript" },
    //     answer: { type: String },
    // },
    // question_11: {
    //     question: { type: Schema.Types.ObjectId, ref: "JavaScript" },
    //     answer: { type: String },
    // },
    // question_12: {
    //     question: { type: Schema.Types.ObjectId, ref: "JavaScript" },
    //     answer: { type: String },
    // },
    // question_13: {
    //     question: { type: Schema.Types.ObjectId, ref: "JavaScript" },
    //     answer: { type: String },
    // },
    // question_14: {
    //     question: { type: Schema.Types.ObjectId, ref: "JavaScript" },
    //     answer: { type: String },
    // },
    // question_15: {
    //     question: { type: Schema.Types.ObjectId, ref: "JavaScript" },
    //     answer: { type: String },
    // },
    // question_16: {
    //     question: { type: Schema.Types.ObjectId, ref: "JavaScript" },
    //     answer: { type: String },
    // },
    // question_17: {
    //     question: { type: Schema.Types.ObjectId, ref: "JavaScript" },
    //     answer: { type: String },
    // },
    // question_18: {
    //     question: { type: Schema.Types.ObjectId, ref: "JavaScript" },
    //     answer: { type: String },
    // },
    // question_19: {
    //     question: { type: Schema.Types.ObjectId, ref: "JavaScript" },
    //     answer: { type: String },
    // },
    // question_20: {
    //     question: { type: Schema.Types.ObjectId, ref: "JavaScript" },
    //     answer: { type: String },
    // },
})
const userSolution = model("User-Solution", UserSolutionsSchema);

export default userSolution;