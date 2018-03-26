'use strict';
const Todo = require('../models').Todo;
const TodoItem = require('../models').TodoItem;
const HttpStatus = require('http-status-codes');

module.exports = {
  createTodo,
  getTodo,
  destroyTodo,
  updateTodo,
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
      where: {
        user: req.user.id,
      },
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

async function destroyTodo(req, res) {
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

async function updateTodo(req, res) {
  try {
    const todo = await Todo.findOne({
      where: {
        id: req.body.id,
      },
      include: [
        {
          model: TodoItem,
          as: 'todoItems',
        },
      ],
    });

    if (!todo) {
      console.error(new Error(`No such todo item ${JSON.stringify(req.body)} 
      in user ${JSON.stringify(req.user)}`));
      return res.status(HttpStatus.BAD_REQUEST)
        .end();
    }

    const r = await todo.update({
      title: req.body.title,
      deadline: req.body.deadline,
    });

    const todoItems = req.body.todoItems;

    for (let i = 0; i < todoItems.length; i++) {

    }

    res.send({});
  } catch (e) {
    console.error(e);
    return res.status(HttpStatus.BAD_REQUEST)
      .end();
  }
}
