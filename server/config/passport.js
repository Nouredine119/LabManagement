const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const User = require('../models/User');

passport.use(
  new GoogleStrategy(
    {
      clientID: '647073529118-gsrv7nvomh6vp0s27babj0642kesk97l.apps.googleusercontent.com',
      clientSecret: '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',
      callbackURL: 'http://localhost:3001/auth/google/callback',
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        // Check if the user already exists in the database
        const existingUser = await User.findOne({ googleId: profile.id });

        if (existingUser) {
          return done(null, existingUser);
        }

        // If the user doesn't exist, create a new user in the database
        const newUser = new User({
          
          email: profile.emails[0].value,
         
          typeUser: 'guest',  
          
          googleId: profile.id,
        });

        // Generate and store a token using the generateToken method in your user model
        const generatedToken = await newUser.generateToken();

        // Log the generated token (optional)
        console.log('Generated Token:', generatedToken);

        await newUser.save();
        return done(null, newUser);
      } catch (error) {
        return done(error, false);
      }
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((obj, done) => {
  done(null, obj);
});

module.exports = passport;
