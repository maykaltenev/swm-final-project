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

//http://localhost:5000/user/quiz/result
router.post("/quiz/result", updateUserQuizResults);

/**
 * GOOGLE LOGIN PATHS
 */

router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

router.get(
  "/google/callback",
  passport.authenticate("google", {
    failureRedirect: "/user/google/failure",
    session: false,
  }),
  async (req, res) => {
    /*     console.log('from google callback: id is', req?.user?._id) */
    // User is the class. req.user is a new User
    const token = await generateToken(req?.user);
    /*   console.log("the token from google server is:", token) */
    res.cookie("cookiename", token);

    res.redirect(
      process.env.REACT_APP_REDIRECT_URL + "/glogin/" + req?.user?._id
    );
  }
);

router.get("/glogin/:id", async (req, res) => {
  /*   console.log('from glogin: id is', req.params.id) */

  const user = await User.findById(
    req?.params?.id
  ); /* .select('-__v -password') */

  res.send({ success: true, user });
});
export default router;
