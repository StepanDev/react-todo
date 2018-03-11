'use strict';
const Todo = require('../models').Todo;
const TodoItem = require('../models').TodoItem;
const HttpStatus = require('http-status-codes');

module.exports = {
  createTodo,
  getTodo,
};

async function createTodo(req, res) {
  try {
    const todo = {
      title: req.body.title,
      user: req.user.id,
    };
    const createdTodo = await Todo.create(todo);
    return res.status(HttpStatus.CREATED).send(createdTodo);
  } catch (e) {
    console.error(e);
    return res.status(HttpStatus.BAD_REQUEST).end();
  }
}

async function getTodo(req, res) {
  try {
    const foundTodos = await Todo.findAll({
      include: [{
        model: TodoItem,
        as: 'todoItems',
      }],
    });
    return res.send(foundTodos);
  } catch (e) {
    console.error(e);
    return res.status(HttpStatus.BAD_REQUEST).end();
  }
}

