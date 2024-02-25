const passport = require('passport');
const User = require('./User');
const GoogleStrategy = require('passport-google-oauth2').Strategy;

const GOOGLE_CLIENT_ID = '445982889523-sc1mndeaeqi1fkt5nuq2fllgnlc7j1br.apps.googleusercontent.com';
const GOOGLE_CLIENT_SECRET = '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';

passport.use(new GoogleStrategy({
  clientID: '445982889523-sc1mndeaeqi1fkt5nuq2fllgnlc7j1br.apps.googleusercontent.com',
  clientSecret: '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',
  callbackURL: "http://localhost:5000/auth/google/callback",
  passReqToCallback: true,
},
function(request, accessToken, refreshToken, profile, done) {
  return done(null, profile);
}));

passport.serializeUser(async function(user, done) {
  console.log(user);
  const name = user.displayName;
  const email = user.email;
  const newUser = new User({name, email})
  await newUser.save();
  done(null, user);
});

passport.deserializeUser(function(user, done) {
  done(null, user);
});