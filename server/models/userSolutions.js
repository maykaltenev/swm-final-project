import mongoose from "mongoose";
const { Schema, model } = mongoose;

export const UserSolutionsSchema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: "user" },
    question: { type: Schema.Types.ObjectId, ref: "user" },
    answer: [{ type: Schema.Types.ObjectId, ref: "JavaScript" }],
    sessionId: { type: Schema.Types.ObjectId, ref: "quizSession" }
})
const userSolution = model("User-Solution", UserSolutionsSchema);

export default userSolution;