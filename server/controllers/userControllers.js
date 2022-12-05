import dotenv from "dotenv";
import passport from "passport";
import bcrypt from "bcrypt";
import generateToken from "../helpers/authenticationHelper.js";
import User from "../models/user.js";
dotenv.config();
/* -----------------------google strategy-------------------------- */

import { Strategy as GoogleStrategy } from "passport-google-oauth20";

// initialize googlestrategy. syntax ({options}, callback function)
console.log("client id is:",process.env.GOOGLE_CLIENT_ID)
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
      // register the user in db
      // only if the user doesn't exist
      // in db
      console.log("the profile is", profile);
      const email = profile._json.email;

      // check if there is such a user in db
      const user = await User.findOne({ email });

      // if there is such user then return it
      // we need to create a token in the db
      // if the user is in our db
      // the cb function adds the user
      // or whatever we return to the req.user
      if (user) return cb(null, user);

      // create a new user to insert to the db
      const newUser = new User({
        firstName: profile._json.given_name,
        lastName: profile._json.family_name,
        username: profile.id,
        email,
        password: process.env.password,
      });
      console.log("saving user", newUser);
      /*   pass: email */

      const savedUser = await newUser.save();

      return cb(null, savedUser);
    }
  )
);
/* -----------------------google strategy-------------------------- */
/* ----------------------------registering a new user--------------------------- */
export const registerUser = async (req, res) => {
  // get the user details from register form from frontend
  const { firstName, lastName, email, password } = req.body;
/* once password is received, hash the passsword and save */
  const hashedPassword = await bcrypt.hash(password, 11);
  try {
    /* check if the user exist already with the unique email */
    const userExists = await User.findOne({ email: email });
    if (userExists) {
      /* if user already exist, send a message that user already exist */
      return res.status(409).json({ message: "User is already registered!" });
    }
    /* if the user email doesn't exist in db , create a new user with firstname,lastname,email,hashedpassword */
    const createdUser = await User.create({
      firstName,
      lastName,
      email,
      password: hashedPassword,
    });
    return res.status(201).json({ message: "User created", createdUser });
  } catch (error) { // if user creation is not successful, respond it with error message
    return res.status(500).json({ message: error.message });
  }
};
/* ----------------------------login user who is already registered--------------------------- */
export const loginUser = async (req, res) => {
  /* enter email and password from client */
  const { email, password } = req.body;
  try { // check for correctness of email & password, if it is not correct send an error message
    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Please provide email and password" });
    }
    /* if the user enters correct email and password, check the user in db */
    const user = await User.findOne({ email }).select("+password");
    /* if there is no user with given email */
    if (!user) {
      /* send reply, user not found */
      return res.status(400).json({ message: " user not found" });
    }
/* compare the password  from the user and the stored password of the user in db*/
    const checkPassword = await bcrypt.compare(password, user.password);
    /* if the password matches, generate a token with JWT stratergy */
    if (checkPassword) {
      const token = await generateToken(user);
      /* once the token is generated, store it in cookie, the user details */
      return res
        .status(200)
        .cookie("jwt", token, {
          httpOnly: true,
          secure: false,
          sameSite: false,
        })
        .json({ user });
    } else { /* send error message, no access granted */
      return res.status(400).json({ message: "No access granted" });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
/* ----------------------------getting the user data with his id--------------------------- */
export const getUserData = async (req, res) => {
  const { id } = req.body;
/* find the user details with his id */
  try {
    const userData = await User.findOne({ _id: id });

    return res.status(200).json(userData);
  } catch (error) {
    return res.send(error.message);
  }
};
/* ----------------------------getting all the users--------------------------- */
export const getUserDatas = async (req, res) => {
  try {
    const userDatas = await User.find();

    return res.status(200).json(userDatas);
  } catch (error) {
    return res.send(error.message);
  }
};
/* ----------------------------logging out the user--------------------------- */
export const logout = async (req, res, next) => {
  /* clear the cookies which has the user data */
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
/* ----------------------------updating the quiz timer--------------------------- */
export const updateQuizTimer = async (req, res) => {
  //get the user id, start time and end time
  const { start, end, id } = req.body;
/* set the quiz timer for the user, find by user id and update the quiz timer */
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
/* ----------------------------update the quiz results for the user--------------------------- */
export const updateUserQuizResults = async (req, res) => {
  const { userId, sessionId, resultPercentage, quizType } = req.body;
  /* finding the user by id and update the session Id */
  try {
    const session = await User.findOne({
      _id: userId,
      "quizResults.sessionId": sessionId,
    });

    console.log(session);

    if (session) {
      return;
    }
/* push the result of the user by user id and update */
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

    console.log(updateUserQuizResult);
    return res.status(200).json(updateUserQuizResult);
  } catch (error) {
    return res.send(error);
  }
};
