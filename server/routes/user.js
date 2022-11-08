import { Router } from "express";
import passport from "passport";
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


//google authuentication
 router.get('/google',
  passport.authenticate('google', { scope:
      [ 'email', 'profile' ] }
));

router.get( '/google/callback',
    passport.authenticate( 'google', {
        successRedirect: '/',
        failureRedirect: '/login'
})); 
export default router;
