const express = require('express');
const Router = express.Router();

const todo = require('./todo');
const user = require('./user');

Router.use('/todo', todo);
Router.use('/user', user);

module.exports = Router;