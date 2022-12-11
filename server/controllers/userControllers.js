import dotenv from "dotenv";
import passport from "passport";
import bcrypt from "bcrypt";
import generateToken from "../helpers/authenticationHelper.js";
import User from "../models/user.js";
dotenv.config();
/* -----------------------google strategy-------------------------- */

import { Strategy as GoogleStrategy } from "passport-google-oauth20";
console.log('strategy is', GoogleStrategy)
// initialize googlestrategy. syntax ({options}, callback function)
console.log("clientId", process.env.GOOGLE_CLIENT_ID)
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "/user/google/callback",
      proxy: true,
    },
    async (accessToken, refreshToken, profile, cb) => {
      console.log("inside strategy instance: profile", profile);
      //       // register the user in db
      //       // only if the user doesn't exist
      //       // in db
      console.log("the profile is", profile);
      const email = profile._json.email;

      // check if there is such a user in db
      const user = await User.findOne({ email });

      /*  if there is such user then return it
       we need to create a token in the db
       if the user is in our db
       the cb function adds the user
       or whatever we return to the req.user */
      if (user) return cb(null, user);

      //create a new user to insert to the db
      const newUser = new User({
        firstName: profile._json.given_name,
        lastName: profile._json.family_name,
        username: profile.id,
        email,
        password: "google",
      });
      console.log("saving user", newUser);
      /*   pass: email */

      const savedUser = await newUser.save();

      return cb(null, savedUser);
    }
  )
);
/* -----------------------google strategy-------------------------- */
export const registerUser = async (req, res) => {
  const { firstName, lastName, email, password } = req.body;

  const hashedPassword = await bcrypt.hash(password, 11);
  try {
    const userExists = await User.findOne({ email: email });
    if (userExists) {
      return res.status(409).json({ message: "User is already registered!" });
    }
    const createdUser = await User.create({
      firstName,
      lastName,
      email,
      password: hashedPassword,
    });
    return res.status(201).json({ message: "User created", createdUser });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Please provide email and password" });
    }
    const user = await User.findOne({ email }).select("+password");
    if (!user) {
      return res.status(400).json({ message: " user not found" });
    }

    const checkPassword = await bcrypt.compare(password, user.password);
    if (checkPassword) {
      const token = await generateToken(user);
      return res
        .status(200)
        .cookie("jwt", token, {
          httpOnly: true,
          secure: false,
          sameSite: false,
        })
        .json({ user });
    } else {
      return res.status(400).json({ message: "No access granted" });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const getUserData = async (req, res) => {
  const { id } = req.body;

  try {
    const userData = await User.findOne({ _id: id });

    return res.status(200).json(userData);
  } catch (error) {
    return res.send(error.message);
  }
};
//checking
export const getUserDatas = async (req, res) => {
  try {
    const userDatas = await User.find();

    return res.status(200).json(userDatas);
  } catch (error) {
    return res.send(error.message);
  }
};
/* ----------------------- */
export const logout = async (req, res, next) => {
  try {
    res
      .clearCookie("jwt", {
        httpOnly: true,
        secure: false,
        sameSite: false,
      })
      .send("User logged out");
  } catch (error) {
    res.send(error);
  }
};

export const updateQuizTimer = async (req, res) => {
  const { start, end, id } = req.body;

  try {
    const addQuizTimer = await User.findByIdAndUpdate(
      id,
      { $set: { "quizTimer.start": start, "quizTimer.end": end } },
      { new: true }
    );
    if (!addQuizTimer) return;

    return res.status(200).json({ message: addQuizTimer });
  } catch (error) {
    return res.status(404).json({ message: error });
  }
};
export const updateUserQuizResults = async (req, res) => {
  const { userId, sessionId, resultPercentage, quizType } = req.body;

  try {
    const session = await User.findOne({
      _id: userId,
      "quizResults.sessionId": sessionId,
    });
    // if session exist stop execution in order to avoid duplication of session
    if (session) {
      return;
    }

    const updateUserQuizResult = await User.findByIdAndUpdate(
      userId,
      {
        $push: {
          quizResults: {
            sessionId,
            resultPercentage,
            quizType,
            createdOn: Date.now(),
          },
        },
      },
      { new: true }
    );

    return res.status(200).json(updateUserQuizResult);
  } catch (error) {
    return res.send(error);
  }
};
