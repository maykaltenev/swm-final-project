import { Router } from "express";
import passport from "passport";
import User from "../models/user.js";
import { generateToken } from "../helpers/authenticationHelper.js";
import {
  registerUser,
  loginUser,
  logout,
  updateQuizTimer,
  getUserData,
  getUserDatas,
  updateUserQuizResults,
} from "../controllers/userControllers.js";
const router = Router();

//http://localhost:5000/user/register
router.post("/register", registerUser);

//http://localhost:5000/user/login
router.post("/login", loginUser);

//http://localhost:5000/user/userData
router.post("/userData", getUserData);

//localhost:5000/user/userdatas
http: router.get("/userdatas", getUserDatas);

//http:localhost:5000/user/logout
router.get("/logout", logout);

//http:localhost:5000/user/addTimer
router.patch("/addTimer", updateQuizTimer);

//http://localhost:5000/user/js/quiz/result
router.post("/js/quiz/result", updateUserQuizResults);

/**
 * GOOGLE LOGIN PATHS
 */
/* go to the google server and asking for auth of the profile of the user */
router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);
/* call back function for google server to display the result ,once the google server has info */

router.get(
  "/google/callback",
  passport.authenticate("google", {
    failureRedirect: "/user/google/failure",
    session: false,
  }),
  async (req, res) => {
    console.log("from google callback: id is", req.user._id);

    // User is the class. req.user is a new User
    //if the user is true from google server, our app create a token using jwt stratergy
    const token = await generateToken(req.user);
    //send the token as response as a cookie name in cookies
    res.cookie("cookiename", token);
    //once the token is generated, redirect to glogin page
    res.redirect("http://localhost:3000/glogin/" + req.user._id);
  }
);
/* get info from glogin page in front end */
router.get("/glogin/:id", async (req, res) => {
  const user = await User.findById(
    req.params.id
  );
  /* send the response if the user is correct */
  res.send({ success: true, user });
});
export default router;
