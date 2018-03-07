import React, { Component } from 'react';
import axios from 'axios';
import AddIcon from 'material-ui-icons/Add';

import Todo from './Todo';

class TodoList extends Component {

  constructor(props) {
    super(props);
    this.state = { todos: [] };
  }

  componentDidMount() {
    axios.get('/api/todo')
      .then(res => {
        const todos = res.data;
        this.setState({ todos });
      })
      .catch(e => {
        console.error(e);
        this.setState({ error: true });
      });
  }

  render() {
    const { todos } = this.state;
    return (todos.map((value, index) =>
      <Todo todo={ value } key={ value.id }/>,
    ));
  }
}

export default TodoList;
