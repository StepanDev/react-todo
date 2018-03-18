const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const JwtStrategy = require('passport-jwt').Strategy; // авторизация через JWT
const ExtractJwt = require('passport-jwt').ExtractJwt; // авторизация через JWT

const User = require('../models/').User;
const env = process.env.NODE_ENV || 'development';

const config = require('../config/config');
const secretKey = config[env].secretKey;
const cookieExtractor = function (req) {
  let token = null;
  if (req && req.cookies) {
    token = req.cookies.jwt;
  }

  return token;
};

const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromExtractors([cookieExtractor]),
  secretOrKey: secretKey,
};

passport.use(new LocalStrategy(
  {

    usernameField: 'login',
    passwordField: 'password',
  },
  function (userMail, password, done) {
    User.findOne({ where: { email: userMail } })
      .then(function (user) {
        if (!user || !user.checkPassword(password)) {
          return done(null, false, {
            message: 'Нет такого пользователя или пароль неверен.',
          });
        }

        return done(null, user);
      })
      .catch(function (err) {
        console.trace(err);
        return done(err);
      });
  },
));

passport.serializeUser(function (user, done) {
  done(null, user.id);
});

passport.deserializeUser(function (id, done) {
  User.findById(id, function (err, user) {
    console.trace(err);
    done(err, user);
  });
});

passport.use('jwt', new JwtStrategy(jwtOptions, function (jwtPayload, done) {
  User.findById(jwtPayload.id)
    .then(function (user) {
      user ? done(null, user) : done(null, false);
    })
    .catch(function (err) {
      console.trace(err);
      return done(err);
    });
}));
