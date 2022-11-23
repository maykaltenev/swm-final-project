import { Router } from "express";
import passport from "passport";
import {
  registerUser,
  loginUser,
  logout,
  updateQuizTimer,
  getUserData,
 
} from "../controllers/userControllers.js";
const router = Router();

//http://localhost:5000/user/register
router.post("/register", registerUser);

//http://localhost:5000/user/login
router.post("/login", loginUser);

//http://localhost:5000/user/allUser
router.post("/userData", getUserData);

//http:localhost:5000/user/logout
router.get("/logout", logout);

//http:localhost:5000/user/addTimer
router.patch("/addTimer", updateQuizTimer);

/**
 * GOOGLE LOGIN PATHS
 */

 router.get('/google', passport.authenticate('google', {scope: ['profile', 'email']}))


 router.get('/google/callback', passport.authenticate('google', {
     failureRedirect: '/user/google/failure',
     session: false
 }), async (req, res) => {
 
     console.log('from google callback: id is', req.user._id)
 
     // User is the class. req.user is a new User
     const token = await req.user.generateToken('1d')
 
     res.cookie('cookiename', token)
 
     res.redirect('http://localhost:3000/glogin/' + req.user._id)
 })
 
 router.get('/glogin/:id', async (req, res) => {
 
     console.log('from glogin: id is', req.params.id)
 
     const user = await User.findById(req.params.id).select('-__v -pass')
 
     res.send({success: true, user})
 })

export default router;
