import React, { Component } from 'react';
import axios from 'axios';

import {
  Button,
  FormControl,
  Paper,
  InputLabel,
  Input,
  InputAdornment,
  IconButton,
} from 'material-ui';

class Todo extends Component {
  constructor(props) {
    super(props);
    this.state = { todo: props.todo };
  };

  render() {
    const { todo } = this.state;
    return (
      <Paper elevation={ 4 } style={ { maxWidth: 350 } }>
        <h1>{ todo.title }</h1>
      </Paper>
    );
  }
}

export default Todo;
