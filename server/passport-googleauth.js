import GoogleStrategy from "passport-google-oauth2.Strategy";


//module.export = (passport) => {
passport.use(new GoogleStrategy({
    clientID:  process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    callbackURL: "http://localhost:3001/auth/google/callback",
    passReqToCallback   : true
  },
  function(request, accessToken, refreshToken, profile, done) {
     User.findOrCreate({ googleId: profile.id }, function (err, user) {
      return done(err, user); 
    });
    console.log("trying to access google account")
  }
))
//}