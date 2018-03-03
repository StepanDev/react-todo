'use strict';
const User = require('../controllers/').user;
const Router = require('express').Router();
const passport = require('passport');

Router.post('/login', passport.authenticate('local'), User.login);
Router.post('/sign-up', User.signUp);

Router.route('/')
  .get(passport.authenticate('jwt'), User.getUser)
  .put(passport.authenticate('jwt'), User.updateUser);


module.exports = Router;