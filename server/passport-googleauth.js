import Google from "passport-google-oauth20";
import passport from "passport";
import User from "./models/user.js";
const GoogleStrategy = Google.Strategy;

export const passportAuth = (passport) => {
  passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.CLIENT_ID,
        clientSecret: process.env.CLIENT_SECRET,
        callbackURL: "http://localhost:5000/api/auth/google/callback",
        passReqToCallback: true,
      } , 
      async function (request, accessToken, refreshToken, profile, done) {
        try {
          const checkUser = await User.findOne({ googleId: profile.id });
          if (!checkUser) {
            const createUser = await User.create({
              googleId: profile.id,
              email: "test@email.com",
            });
            return done(null, createUser);
          } else {
            done(null, checkUser);
          }
        } catch (error) {
          console.log(error);
          return done(error, null);
        }
      }
    )
  ),
  
  passport.serializeUser(function(user, done){
    console.log("serialize user",user)
    done(null, user._id);
}),

passport.deserializeUser(function(user, done) {
  console.log("deserialize user",user)
        done(null, user);
    
})
};


