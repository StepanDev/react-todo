'use strict';
const Router = require('express').Router();
const passport = require('passport');

const Todo = require('../controllers/').todo;
const TodoItem = require('./todo-item');

Router.route('/')
  .get(passport.authenticate('jwt'), Todo.getTodo)
  .post(passport.authenticate('jwt'), Todo.createTodo)
  .delete(passport.authenticate('jwt'), Todo.destroyTodo)
  .put(passport.authenticate('jwt'), Todo.updateTodo);

Router.all('/:todoId/todo-item', passport.authenticate('jwt'), TodoItem);

module.exports = Router;
