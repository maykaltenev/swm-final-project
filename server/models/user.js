import mongoose from "mongoose";
import { generateRobohashAvatar } from "../helpers/avatar.js";
const { Schema, model } = mongoose;

const UserSchema = new Schema({
  email: {
    type: String,
    required: [true, "the user must have an Email"],
    unique: true,
  },
  firstName: {
    type: String,
    required: [true, "the user must have a firstName"],
  },
  lastName: {
    type: String,
  },
  password: {
    type: String,
    required: [true, "the user must have a password"],
    select: false,
  },
  avatar: { type: String, default: generateRobohashAvatar() },
  dates: { registered: { type: Date, default: Date.now }, last_active: Date },
  pro: Boolean,
  certificates: [Schema.Types.ObjectId],
  skills: [String],
  quizResults: {
    sessionId: String,
    resultPercentage: String,
    quizType: String,
    createdOn: { type: Date, default: Date.now },
    type: Array,
  },
  quizTimer: { start: { type: Date }, end: { type: Date } },
});

const User = model("user", UserSchema);

export default User;
