const TodoItem = require('../models').TodoItem;
const HttpStatus = require('http-status-codes');

module.exports = {
  createTodoItem,
  getTodoItem
};

async function createTodoItem(req, res) {
  try {
    const createdItem = await TodoItem
      .create({
        content: req.body.content,
        todoId: req.params.todoId,
      });
    return res.status(HttpStatus.CREATED).send(createdItem);
  } catch (e) {
    console.error(e);
    return res.status(HttpStatus.BAD_REQUEST).end();
  }
}

async function getTodoItem(req, res) {
  try {
    const foundTodoItems = await TodoItem.all();
    return res.send(foundTodoItems);
  } catch (e) {
    console.error(e);
    return res.status(HttpStatus.BAD_REQUEST).end();
  }
}