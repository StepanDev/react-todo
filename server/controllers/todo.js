'use strict';
const Todo = require('../models').Todo;
const TodoItem = require('../models').TodoItem;
const HttpStatus = require('http-status-codes');

module.exports = {
  createTodo,
  getTodo,
  destroy,
};

async function createTodo(req, res) {
  try {
    const todo = {
      title: req.body.title,
      user: req.user.id,
    };
    const createdTodo = await Todo.create(todo);
    const todoItems = req.body.todoItems || [];

    for (let i = 0; i < todoItems.length; ++i) {
      let todoItem = {
        content: todoItems[i].content,
        todoId: createdTodo.id,
      };

      await TodoItem.create(todoItem);
    }

    return res.status(HttpStatus.CREATED).send(createdTodo);
  } catch (e) {
    console.error(e);
    return res.status(HttpStatus.BAD_REQUEST).end();
  }
}

async function getTodo(req, res) {
  try {
    const foundTodos = await Todo.findAll({
      include: [
        {
          model: TodoItem,
          as: 'todoItems',
        },
      ],
    });
    return res.send(foundTodos);
  } catch (e) {
    console.error(e);
    return res.status(HttpStatus.BAD_REQUEST).end();
  }
}

async function destroy(req, res) {
  try {
    const id = req.query.todoId;
    const todo = await Todo.findById(id);
    await todo.destroy({ force: true });
    res.end();
  } catch (e) {
    console.error(e);
    return res.status(HttpStatus.BAD_REQUEST).end();
  }
}
