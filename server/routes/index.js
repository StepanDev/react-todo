const express = require('express');
const Router = express.Router();

const todo = require('./todo');
const api= require('./api');

Router.use('/api', api);

module.exports = Router;