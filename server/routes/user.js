'use strict';
const User = require('../controllers/').user;
const Router = require('express').Router();
const passport = require('passport');
const createUser = require('../midddlewares/create-user');

Router.post('/login', passport.authenticate('local'), User.login);

Router.post('/logout', passport.authenticate('jwt'), User.logout);

Router.post('/sign-up', createUser, User.login);

Router.route('/')
  .get(passport.authenticate('jwt'), User.getUser)
  .put(passport.authenticate('jwt'), User.updateUser);

module.exports = Router;
