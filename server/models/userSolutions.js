import mongoose from "mongoose";
const { Schema, model } = mongoose;

export const UserSolutionsSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: "user" },
  question: { type: Schema.Types.ObjectId, ref: "JavaScript" },
  answer: [{ type: String }],
  sessionId: { type: Schema.Types.ObjectId, ref: "quizSession" },
});
const userSolution = model("User-Solution", UserSolutionsSchema);

export default userSolution;
