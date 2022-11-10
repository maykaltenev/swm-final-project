import { Router } from "express";
import passport from "passport";
//import passport from "../passport-googleauth.js"
import {
  registerUser,
  loginUser,
  getAllUsers,
  logout,
} from "../controllers/userControllers.js";

const router = Router();

//http://localhost:5000/user/register
router.post("/register", registerUser);

//http://localhost:5000/user/login
router.post("/login", loginUser);

//http://localhost:5000/user/allUser
router.get("/allUser", getAllUsers);

//http:localhost:5000/user/logout
router.get("/logout", logout);

//*****************************google authuentication****************************
//http://localhost:5000/auth
// The request will be redirected to Google for authentication
router.get(
  "/google",
  passport.authenticate("google", { scope: ["email", "profile"] })
);

router.get("/auth/error", (req, res) => res.send("Unknown Error"));

//http://localhost:5000/auth/google
router.get(
  "/google/callback",
  passport.authenticate("google", {
    failureRedirect: "/auth/error",
    successRedirect: "http://localhost:3000",
  }),
  function (req, res) {
    res.redirect("http://localhost:3000");
  }
);
router.get("/", (req, res) => res.send(`Welcome ${req.user}!`));

export default router;
