const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const FacebookStrategy = require('passport-facebook').Strategy;

const keys = require('../config/keys');
const User = require('../models/User');


passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id)
  .then(user =>  {
    done(null, user);
  });
});

passport.use(new GoogleStrategy({
  clientID: keys.googleClientID,
  clientSecret: keys.googleClientSecret,
  callbackURL: '/auth/google/callback'
}, async (acessToken, refreshToken, profile, done) => {
  try {
    console.log(profile)
    const existingUser = await User.findOne({ $or: [
      { 'google.id': profile.id },
      { 'email': profile.emails[0].value }
  ]});
    if(existingUser && existingUser.google.id){
      return done(null, existingUser );
    }
    if(existingUser && !existingUser.google.id){
      existingUser.google.id = profile.id;
      existingUser.google.email = profile.emails[0].value;
      await existingUser.save();
      return done(null, existingUser );
    } 
  const user = new User({
    email: profile.emails[0].value,
    google: {
      id: profile.id, 
      email: profile.emails[0].value
    }
    });
  await user.save();
  done(null, user);
} catch(e){
    done(error, false, error.message);
  }

}));

passport.use(new FacebookStrategy({
  clientID: keys.facebookClientID,
  clientSecret: keys.facebookClientSecret,
  callbackURL: '/auth/facebook/callback',
  profileFields: ['id', 'emails', 'name']
}, async (accessToken, refreshToken, profile, done) => {
  try {
    console.log(profile)
    const existingUser = await User.findOne({ $or: [
      { 'facebook.id': profile.id },
      { 'email': profile.emails[0].value }
  ]});
  if(existingUser && existingUser.facebook.id){
    return done(null, existingUser );
  }
  if(existingUser && !existingUser.facebook.id){
    existingUser.facebook.id = profile.id;
    existingUser.facebook.email = profile.emails[0].value;
    await existingUser.save();
    return done(null, existingUser );
  } 
   const user = new User(
    {
      email: profile.emails[0].value,
      facebook: {
        id: profile.id, 
        email: profile.emails[0].value
      }
      });
    await user.save();
    done(null, user);
  } catch(e){
     done(e, false, e.message);
  }
}));

/* Strategies for one record for each strategy
passport.use(new GoogleStrategy({
  clientID: keys.googleClientID,
  clientSecret: keys.googleClientSecret,
  callbackURL: '/auth/google/callback'
}, async (acessToken, refreshToken, profile, done) => {
  try {
    console.log(profile)
    const existingUser = await User.findOne({'google.googleId': profile.id });
  if(existingUser){
    return done(null, existingUser );
  } 
  const user = new User({
    method: 'google',
    google: {
      googleId: profile.id, 
      email: profile.emails[0].value
    }
    });
  await user.save();
  done(null, user);
} catch(e){
    done(error, false, error.message);
  }

}));


//something wrong, not able to retrieve email from facebook check guides and facebook devtools
passport.use(new FacebookStrategy({
  clientID: keys.facebookClientID,
  clientSecret: keys.facebookClientSecret,
  callbackURL: '/auth/facebook/callback',
  profileFields: ['id', 'emails', 'name']
}, async (accessToken, refreshToken, profile, done) => {
  try {
    console.log(profile)
    const existingUser = await User.findOne({ 'facebook.facebookId': profile.id });
  if(existingUser){
    return done(null, existingUser );
  } 
   const user = new User(
    {
      method: 'facebook',
      facebook: {
        facebookId: profile.id, 
        email: profile.emails[0].value
      }
      });
    await user.save();
    done(null, user);
  } catch(e){
     done(e, false, e.message);
  }
}));
*/


