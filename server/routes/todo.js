'use strict';
const Todo = require('../controllers/').todo;
const TodoItem = require('./todo-item');
const Router = require('express').Router();

Router.route('/')
  .get(Todo.getTodo)
  .post(Todo.createTodo);


Router.all('/:todoId/todo-item',TodoItem);
module.exports = Router;