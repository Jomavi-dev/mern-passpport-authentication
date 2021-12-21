const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
// const GoogleStrategy = require('passport-google-oauth20').Strategy; //***** *//
const passportJWT = require('passport-jwt')
const JWTStrategy = passportJWT.Strategy
const User = require('../models/user')

const cookieExtractor = req => {
  let token
  if (req && req.cookies)
    token = req.cookies['access_token']
  return token
}

// authorization
passport.use(new JWTStrategy({
  jwtFromRequest: cookieExtractor,
  secretOrKey: process.env.JWT_SECRET_KEY
}, (jwt_payload, done) => {
  User.findById({ _id: jwt_payload.sub }, (err, user) => {
    if (err) done(err, false)
    if (user) done(null, user)
    else done(null, false)
  })
}))

// authentication
passport.use(new LocalStrategy((username, password, done) => {
  User.findOne({ username }, (err, user) => {
    //smth went wrong in the database
    if (err)
      return done(err)
    //user does exist
    if (!user)
      return done(null, false)
    //check if pwd is correct
    user.comparePassword(password, done)
  })
}))

/************** Google Auth ******************

//intall google OAUTH package

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id).then(user => {
    done(null, user);
  });
});

passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: '/auth/google/callback',
  proxy: true
},
  async (accessToken, refreshToken, profile, done) => {
    const existingUser = await User.findOne({ googleId: profile.id })

    if (existingUser) {
      return done(null, existingUser);
    }

    const user = await new User({ googleId: profile.id, username: profile.displayName, password: '' }).save()
    done(null, user);
  }));

  *********************************************************/