'use strict';
const TodoItem = require('../controllers/').todoItem;
const Router = require('express').Router();

Router.route('/:todoId/todo-item')
  .get(TodoItem.getTodoItem)
  .post(TodoItem.createTodoItem);

Router.all('*',function (req,res) {
  console.log('hhhh')
})
module.exports = Router;